'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'rehloo_favorites';

/**
 * Reads the current favorites array from localStorage.
 * Returns [] if nothing is stored or parsing fails.
 */
function readStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

/**
 * useFavorites()
 *
 * Returns:
 *   - favorites  : string[]         — list of saved hostel IDs
 *   - isFavorite : (id) => boolean  — true if id is in favorites
 *   - toggle     : (hostel) => void — add or remove a hostel snapshot
 *   - remove     : (id) => void     — remove by id
 *   - getAll     : () => object[]   — full hostel snapshot objects
 */
export function useFavorites() {
    const [favorites, setFavorites] = useState([]);        // array of IDs
    const [snapshots, setSnapshots] = useState({});        // id → hostel object

    // Hydrate from localStorage on mount (client-only)
    useEffect(() => {
        const stored = readStorage();
        setFavorites(stored.map((h) => h._id));
        const map = {};
        stored.forEach((h) => { map[h._id] = h; });
        setSnapshots(map);
    }, []);

    /** Persist current state to localStorage */
    const persist = useCallback((newSnapshots) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.values(newSnapshots)));
        } catch { /* quota exceeded — silently ignore */ }
    }, []);

    /** Toggle a hostel in/out of favorites */
    const toggle = useCallback((hostel) => {
        const id = hostel._id;
        setSnapshots((prev) => {
            const next = { ...prev };
            if (next[id]) {
                delete next[id];
            } else {
                // Store a minimal snapshot so the favorites page can render offline
                next[id] = {
                    _id: hostel._id,
                    name: hostel.name,
                    slug: hostel.slug,
                    price: hostel.price,
                    area: hostel.area,
                    city: hostel.city,
                    hostelType: hostel.hostelType,
                    verified: hostel.verified,
                    images: hostel.images?.slice(0, 1) ?? [],
                };
            }
            persist(next);
            setFavorites(Object.keys(next));
            return next;
        });
    }, [persist]);

    /** Remove a single hostel by id */
    const remove = useCallback((id) => {
        setSnapshots((prev) => {
            const next = { ...prev };
            delete next[id];
            persist(next);
            setFavorites(Object.keys(next));
            return next;
        });
    }, [persist]);

    const isFavorite = useCallback((id) => favorites.includes(String(id)), [favorites]);
    const getAll = useCallback(() => Object.values(snapshots), [snapshots]);

    return { favorites, isFavorite, toggle, remove, getAll };
}
