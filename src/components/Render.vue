<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    props: ['h'],
    render() {
      return this.h
    }
  })
</script>