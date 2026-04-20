export async function fetchDados() {
    try {
        const response = await fetch('data/data.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
        return null;
    }
}