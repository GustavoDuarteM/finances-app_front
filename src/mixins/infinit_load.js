const infinitLoad = {
  data: () => ({
    bottom: '',
    component: ''
  }),
  methods:{
    bottomVisible() {
      const scrollY = this.component.scrollTop
      const visible = this.component.clientHeight
      const pageHeight = this.component.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    },
    set_containet(container_id){
      this.component = document.getElementById(container_id)
      if(this.component){
        this.component.addEventListener('scroll', () => {
          this.bottom = this.bottomVisible()
        })
      }
    }
  },
}

export default infinitLoad