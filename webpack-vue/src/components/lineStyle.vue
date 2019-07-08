<template>
    <div>
        <div class='title'>线</div>
        <input
          :value="selectEdgeStyle.strokeWidth"
          class="edge-width"
          min="1"
          type="number"
          @input="handleStyleChange('strokeWidth',$event.target.value)"/>
          <input :value="selectEdgeStyle.strokeColor" class="edge-color" type="color"  @input="handleStyleChange('strokeColor',$event.target.value)"/>
          <button @click="handleStyleChange('switch', 'close')">close</button>
    </div>
</template>
<script>
export default {
    props: {
        selectEdgeStyle: {
            type: Object,
            required: true
        },
        handleStyleChange: {
            type: Function,
            required: true
        }
    },
    mounted() {
        console.log(this.selectEdgeStyle);
    }
}
</script>
<style lang="scss" scoped>
    .title {
        margin: 10px;
        font-size: 16px;
        font-weight: bold;
        border-bottom: 1px solid #ccc;
    }
    .edge-width {
        margin-left: 10px;
        width: 44px;
        border-radius: 4px;
    }
    .edge-color {
        border-radius: 4px;
    }
</style>
