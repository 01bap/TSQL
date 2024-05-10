<script>
  import {getInventory} from "$lib/api_querys.js";

  let data = new Array();

  async function fetchData() {
    try {
      console.log("AHDLHDL")
      const response = await fetch('http://localhost:3000/api/query');
      if (response.ok) {
          data = await response.json();
          console.log("Data:", data, data.name)
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
      const response = await fetch('http://localhost:3000/api/getInventory');
      if (response.ok) {
        data = await response.json();
        console.log("Data:", data,data.name)
        if(data.name == "RequestError") {
          console.log(data.originalError.info.message)
        }
      } else {
          console.error('Failed to fetch data:', response.statusText);
      }
    } catch (error) {
          console.error('Fetch error:', error);
    }
  }
</script>

<button on:click={fetchData}>Daten abrufen</button>
<button on:click={data = getInventory()}>Update</button>

{#if data.length > 0}
  <ul>
    {#each data as item}
      <li>{item.grund}</li>
    {/each}
  </ul>
{:else}
  <p>Keine Daten vorhanden</p>
{/if}
  