export const fetchHostels = async (params) => {
    const res = await fetch(`/api/hostels?${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    return data;
}

export const deleteHostel = async (id) => {
    const res = await fetch(`/api/hostels/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    return data;
}

