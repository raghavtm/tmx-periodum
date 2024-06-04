<template>
  <div class="fade">
    <div class="header">
    </div>
    
    <div v-if="homepage">
      <div id="tablemode" class="fade"> <TableDisplay :locale="loc" :elements="elements" @getElement="setElement" /> </div>
    </div>
  
    <div @click="toggleModal" class="modal" id="element_modal">
      <div :class="{
      'modal fade active': modalViewable === true,
      'modal fade inactive': modalViewable === false}">
        <ElementModal v-if="modalViewable" :locale="localization" :element="currentElement" :key="modalkey"/>
      </div>
    </div>
  </div>
</template>

<script>
import TableDisplay from '@/components/TableModeDisplay.vue'
import ElementModal from '@/components/ElementModal.vue';

const CONTENT_LANGUAGE = require("../resources/locale/en/general.json");

const objectsById = require("../resources/locale/obj_by_id.json")

// All objects have been merged or added. Convert our map to an array.
const ELEMENTS = Object.values(objectsById);
export default {
  components: { TableDisplay, ElementModal },
  name: 'PeriodumPage',
  data() {
    return {
      elements: ELEMENTS,
      currentElement: ELEMENTS[0],
      loc: CONTENT_LANGUAGE,
      modalViewable: false,
      locale: {
        en: require("../resources/locale/en/general.json")
      },
      language: 'en',
      modalkey: 0
    }
  },
  computed: {
    homepage() {
      return this.$route.name === 'home'
    },
    localization() {
      return this.loc
    }
  },
  props: {
    mode: String
  },
  methods: {
    setElement(el) {
      this.modalViewable = !this.modalViewable
      
      this.currentElement = el
    },
    toggleModal($event) {
      const eventTarget = $event.target

      if (eventTarget.classList.contains('close-modal') || eventTarget.classList.contains('overlay')) { 
        // document.body.classList.remove('active_modal');
        document.body.removeAttribute('class')

        //Arama kutusunu temizle
        document.querySelector('#modalSearch').value = ''

        this.modalkey++

        this.modalViewable = false;
        return
      }
      if (!eventTarget.closest('.block')) return

      this.modalViewable = !this.modalViewable
    },
    toggleTablePanel() {
      document.querySelector('.table_tabs').classList.remove('inactive')
      document.querySelector('.modules').classList.remove('inactive')
      document.querySelector('#tablePanelBtn').classList.add('inactive')
    },
  },
}
</script>

<style lang="scss" scoped>

  .periodumLogoPart{
    fill:#FFCE03;
  }
  .eaLogoPart{
    fill:#FFFFFF;
    pointer-events: none;
  }
  .eaLogoBackPart{
    fill:#1A1F2A;
  }

  #mmenu_langSwitch {
    min-height: 2.5rem;
    min-width: 2.5rem;
    align-items: center;
  }
  .flags {
    img {
      height: 2vw;
      min-width: 1.2vw;
      margin-right: 1vw;
    }
  }

  .header {
    visibility: hidden;
  }

  #tablemode  {
    display: block;
    height: fit-content;
  }


  .margin {
    margin-bottom: 5vw;
  }

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.5vw;
    margin-top: 1rem;
    
    align-items: center;
    
    @media screen and (max-width: 720px) {
      flex-direction: column;
      margin-top: 1rem;
      padding-bottom: .5rem;
    }
  }

  span {
    font-size: 4rem;
  }

  .title {
    color:white
  }

  .navLeft {
    img {
      @media screen and (max-width: 720px) {
        max-width: 17rem;
      }
    }
    // &:hover {
    //   img {
    //     filter: grayscale(1) brightness(5);
    //   }
    // }
  }
  .navRight {
    border-radius: .5rem;
    right: 0;
    
    @media screen and (max-width: 720px) {
      padding: 1rem 0;
    }
  }
  .navIcon {
    color: #e5bb09;
    font-size: 1rem;
    margin: 0 .2rem;
    transition: all 100ms ease-in-out;

    background-color: #1a1f2a;
    border: 1px solid #232a38;
    border-radius: .3rem;

    padding: .5rem .6rem;
    &:hover {
      color: white;
    }
  }

  .navIcon:hover {
    cursor: pointer;
  }

  #tablePanelBtn {
    animation: tilt-shaking 0.82s cubic-bezier(.36,.07,.19,.97) both;
  }

  @keyframes tilt-shaking {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(5deg); }
    50% { transform: rotate(0eg); }
    75% { transform: rotate(-5deg); }
    100% { transform: rotate(0deg); }
  }

  .active {
    color: whitesmoke;
    display: block;
  }
  .inactive {
    display: none;
  }

  footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .social {
      margin: 0 .3rem;
      color: white;
      padding: 1rem;
      background-color: #232a38;
      border-radius: .3rem;
      img {
        width: 24px; height: 24px;
        float: left;
        // margin-right: 1rem;
      }
      &:active {
        opacity: 1;
        border: 1px dashed black;
        word-break:break-all;
      }
    }
    margin: 2rem 0;
  }

</style>