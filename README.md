import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const items = [
    '/images/item1.png', '/images/item2.png', '/images/item3.png',
    '/images/item4.png', '/images/item5.png', '/images/item6.png',
    '/images/item7.png', '/images/item8.png'
];

async function getPlayerData() {
    const response = await fetch('/api/player-data');
    return response.json();
}

async function chargePlayer(username, amount) {
    const response = await fetch('/api/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, amount })
    });
    return response.json();
}

export default function Gacha() {
    const [username, setUsername] = useState('Steve');
    const [balance, setBalance] = useState(5000);
    const [rolling, setRolling] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        (async () => {
            const data = await getPlayerData();
            setUsername(data.username);
            setBalance(data.balance);
        })();
    }, []);

    const handleGacha = async () => {
        if (balance >= 3000) {
            const result = await chargePlayer(username, 3000);
            if (result.success) {
                setBalance(balance - 3000);
                setRolling(true);
                setTimeout(() => {
                    setRolling(false);
                }, 3000);
            } else {
                alert('Transaction failed!');
            }
        } else {
            alert('Not enough money!');
        }
    };

    useEffect(() => {
        if (rolling) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % items.length);
            }, 100);
            return () => clearInterval(interval);
        }
    }, [rolling]);

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 p-8">
            <Card className="w-full max-w-md bg-opacity-40 backdrop-blur-lg bg-white/10 rounded-2xl p-4 text-white mb-8">
                <CardContent>
                    <h1 className="text-2xl mb-2">Username: {username}</h1>
                    <p className="text-xl">Balance: {balance} Coins</p>
                </CardContent>
            </Card>
            <Card className="w-full max-w-3xl bg-opacity-40 backdrop-blur-lg bg-white/10 rounded-2xl p-4 mb-8">
                <CardContent className="flex overflow-hidden items-center justify-center h-32">
                    <motion.div animate={{ x: rolling ? -500 : 0 }} className="flex gap-4">
                        {items.map((item, index) => (
                            <img key={index} src={item} alt="item" className="w-32 h-32 rounded-lg shadow-lg" />
                        ))}
                    </motion.div>
                </CardContent>
            </Card>
            <Button onClick={handleGacha} className="bg-blue-500 text-white py-2 px-6 rounded-xl shadow-lg hover:bg-blue-600">Gacha (3000 Coins)</Button>
        </div>
    );
}
