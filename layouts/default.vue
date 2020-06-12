<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      GeniePay
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }} DentaLight Inc.</span>
    </v-footer>
  </v-app>

</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'GeniePayment'
    }
  }
}
</script>
