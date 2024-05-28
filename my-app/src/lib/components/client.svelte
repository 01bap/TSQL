<script>
  import {getInventory, testSP} from "$lib/api_querys.js";

  let data = new Array();
  let msg;

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
  async function testHW() {
    let response = await testSP();
    msg = response[0].MESSAGE;
    // console.log(msg, msg[0], msg[0].MESSAGE)
  }
</script>

<button on:click={fetchData}>Daten abrufen</button>
<button on:click={data = getInventory()}>Update</button>
<button on:click={testHW}>EXEC SP</button>

{#if data.length > 0}
  <ul>
    {#each data as item}
      <li>{item.grund}</li>
    {/each}
  </ul>
{:else}
  <p>Keine Daten vorhanden</p>
{/if}

HALLO: {msg}
  