export async function Get_Api() {
try {

    console.log("Fetching data...");

    const fetched_data = await fetch("http://localhost:3000/products");

    const data = await fetched_data.json();

    return data;

} catch (error) {
    console.log("Fetching data failed... " + error);
    return "error";
}
}