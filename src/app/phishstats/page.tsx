'use client';
import React, { useState } from 'react';

async function getPhishStats(searchTerm: string) {
    const res = await fetch(`https://phishstats.info:2096/api/phishing?_where=(title,eq,${searchTerm})&_sort=-id`);
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}

export default function PhishStats() {
    const [searchTerm, setSearchTerm] = useState<string>('nike');
    const [phishStats, setPhishStats] = useState<Array<{ title: string, url: string }>>([]);
    const [shouldFetch, setShouldFetch] = useState<boolean>(false);

    React.useEffect(() => {
        if (shouldFetch) {
            getPhishStats(searchTerm).then(setPhishStats);
            setShouldFetch(false);
        }
    }, [shouldFetch]);

    return (
        <div>
            <h1>PhishStats</h1>
            <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            <button onClick={() => setShouldFetch(true)}>Get Phish Stats</button>
            <ul>
                {phishStats.map((phishStat, index) => (
                    <li key={index}>{phishStat.title} {phishStat.url}</li>
                ))}
            </ul>
        </div>
    );
}