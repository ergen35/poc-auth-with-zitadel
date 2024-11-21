<script lang="ts">
    let { data } = $props();
</script>

<div class="">
   {#if data.authState.isLoggedIn && data.authState.session}
        <div class="mt-4 bg-slate-50">
            <div class="text-center text-black font-bold py-2 px-4 rounded">
                Welcome to your Dashboard, {data.authState.session.identity.fullname}
            </div>
        </div>
   {:else}
   
        <div class="mt-4 bg-slate-50">
            <form action="/auth/login" method="post">
                <button type="submit" class="bg-blue-500 shadow-md cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Login Me In
                </button>
            </form>
        </div>

   {/if}
</div>
