<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<div>
    <h1>Dashboard</h1>
    welcome, {data.authState.session.identity.fullname}
</div>