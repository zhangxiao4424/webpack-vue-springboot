<template>
    <div>
        <h3>子组件2</h3>
    </div>
</template>
<script>
    class DataSource{
        constructor() {
            console.log(111);
            let i = 0;
            this._id = setInterval(() => {this.emit(i++), 200});
        }
    }
</script>
<style lang="scss">
    
</style>
