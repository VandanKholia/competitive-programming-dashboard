
export default async function fetchCodeforcesData(userName) {
    const url = `${process.env.CODEFORCES_URL}${userName}`;
try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching Codeforces data:", error);
        throw error;
    }
}
