<script>
    let data = new Array();
  
    async function fetchData() {
      try {
        console.log("AHDLHDL")
        const response = await fetch('http://localhost:3000/api/query'); // HTTP-Anfrage an API-Route
        if (response.ok) {
            //console.log("Client:", response)
            data = await response.json(); // Ergebnisse empfangen
            console.log("Data:", data)
        } else {
            console.error('Failed to fetch data:', response.statusText);
        }
      } catch (error) {
            console.error('Fetch error:', error);
      }
    }
    async function test() {
      try {
        console.log("test")
        const response = await fetch('http://localhost:3000/api/update'); // HTTP-Anfrage an API-Route
        if (response.ok) {
            //console.log("Client:", response)
            data = await response.json(); // Ergebnisse empfangen
            console.log("Data:", data)
        } else {
            console.error('Failed to fetch data:', response.statusText);
        }
      } catch (error) {
            console.error('Fetch error:', error);
      }
    }
  </script>
  
  <button on:click={fetchData}>Daten abrufen</button>
  <button on:click={test}>Update</button>
  
  {#if data.length > 0}
    <ul>
      {#each data as item}
        <li>{item.grund}</li>
      {/each}
    </ul>
  {:else}
    <p>Keine Daten vorhanden</p>
  {/if}
  