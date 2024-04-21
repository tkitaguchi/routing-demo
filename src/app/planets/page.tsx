async function getPlanets() {
    const res= await fetch("https://swapi.dev/api/planets/"); //res stands for result
    if(!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}

export default async function Planets() {
    const planets= await getPlanets(); //colocated
    return(
        <div>
        <h1>Planets</h1>
        <ul>
            {planets.results.map((planet: { name: string},
                index: string) =>(
                <li key={index}>{planet.name}</li>
            ))}
        </ul>
        </div>
    );
}