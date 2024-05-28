<script>
    import Client from "$lib/components/client.svelte";
    import Test from "$lib/components/testAPI.svelte";
    import LinkPreview from "../../lib/components/linkPreview.svelte";
</script>

<div class="w-screen h-screen flex flex-col">
    <Client/>
    <Test/>
    
    <div class="h-full w-full">
        <LinkPreview/>
    </div>
</div>