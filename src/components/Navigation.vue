<script lang="ts" setup>

  import { ref, reactive, watchEffect, h } from 'vue'
  import { NAffix, NPopselect, NMenu } from 'naive-ui'
  import { RouterLink } from 'vue-router'

  import { NavType } from '../config/enum'

  import IconMenu from '../components/icons/IconMenu.vue'
  import IconPeople from '../components/icons/IconPeople.vue'

  import Render from './Render.vue'
  import Login from './Login.vue'

  const props = defineProps<{
    nav: any
  }>()

  const MenuOptions = reactive([] as any[])

  watchEffect(() => {
    const { nav } = props.nav
    if(nav.length > 0) {
      for(let i in nav) {
        if(nav[i].type == NavType.route) {
          MenuOptions.push(h(
            RouterLink,
            {
              to: {
                path: nav[i].url,
              },
              title: nav[i].description || ''
            },
            () => nav[i].title
          ))
        } else {
          MenuOptions.push(h(
            'a',
            {
              href: nav[i].url,
              target: '_blank',
              rel: 'noopenner noreferrer',
              title: nav[i].description
            },
            nav[i].title
          ))
        }
      }
    }
  })

</script>

<template>
  <n-affix :top="0" :trigger-top="60">
    <div class="header-navigation">
      <div class="header-navigation-left">
        <n-popselect
          size="small"
          scrollable
        >
          <a class="header-navigation-button" href="javascript:;"><icon-menu /></a>
          <template #empty>
            导航
          </template>
          <template #action>
            <div class="navigation-button-list">
              <template v-for="item in MenuOptions">
                <Render :h="item" class="navigation-button"></Render>
              </template>
            </div>
          </template>
        </n-popselect>
      </div>
      <div class="header-navigation-right">
        <n-popselect
          size="medium"
          scrollable
        >
          <a class="header-navigation-button" href="javascript:;"><icon-people /></a>
          <template #empty>
            登陆
          </template>
          <template #action>
            <Login></Login>
          </template>
        </n-popselect>
      </div>
    </div>
  </n-affix>
</template>

<style lang="less" scoped>
  .header-navigation {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: var(--width);
    padding: .5rem;
    background-color: rgba(255, 255, 255, .2);
    backdrop-filter: blur(10px);

    .icon {
      color: #fff;
      font-size: 1.1rem;
    }

    .header-navigation-button {
      padding: 8px;
      border-radius: 5px;
      line-height: 1;
      transition: .3s background-color ease-in-out;

      &:hover, &:focus {
        background-color: rgba(0, 0, 0, .1)
      }
    }
  }
  .navigation-button-list {
    display: grid;
    grid-row-gap: .5rem;

    .navigation-button {
      text-align: center;
      color: #576B95;
      text-decoration: none;
      padding: 5px;
      line-height: 1;
      border-radius: 5px;

      &:hover, &:focus {
        text-decoration: none;
        background-color: rgba(0, 0, 0, .1);
      }
    }
  }
</style>