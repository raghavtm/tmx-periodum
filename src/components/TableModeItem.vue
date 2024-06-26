<template>
  <div @click="toggleModal($event)" :id="eID" class="table_elementContainer flex-evenly flex-column overflow-hidden"
   :class="{
    'uncertain':  heatState === 'uncertain',
    'solid':      heatState === 'solid',
    'liquid':     heatState === 'liquid',
    'gas':        heatState === 'gas',
    'colored': !heat_view
  }">
  
  <div class="table_atomicNumberContainer">
    <div class="flex-between preventMouseEvent">
      <div
        class="table_atomicNumber"
        :class="{'colored flex-between': !heat_view}">
          <p> {{ element.number }} </p>
      </div>
      
      <img v-show="heat_view"
        class="heatState fade"
        :src="this.states[this.heatState] || ''"
      />
    </div>
  </div> 
    <div class="table_symbol preventMouseEvent" :class="{'colored': !heat_view}" >{{ element.symbol }}</div>
    <div class="table_name preventMouseEvent" :class="{'colored': !heat_view}"> {{ element.name }} </div>
    <div class="table_atomicMass preventMouseEvent" :class="{'colored': !heat_view}">{{ Math.round(element.atomic_mass) }}</div>
    <span class="table_elementBlock inactive">{{ 'table_groupFilter_' + element.block }}</span>
    <span class="table_elementCategory inactive">{{ element.category_code }}</span>
  </div>
</template>

<script>
export default {
  props: { element: Object, heat_value: [Number, String], heat_changed: Boolean, heat_view: Boolean, eID: String, debouncedHeatValue: [Number, String] },
  data() {
    const elementCategory = this.element.category_code;
    const categoryColors = {
      'alkaline_metals': '#ffaf80',          // turuncu
      'alkaline_metals_shade': '#ef9851',

      'alkaline_earth_metal': '#80ff8e',   // yeşil
      'alkaline_earth_metal_shade': '#44e053',

      'transition_metal': '#ffef80',          // sarı
      'transition_metal_shade': '#c1b45f',

      'post_transition_metal': '#80d5ff',  // mavi
      'post_transition_metal_shade': '#52c5fe',

      'metalloid': '#8095ff',               // slate
      'metalloid_shade': '#526efe',

      'reactive_nonmetal': '#ff80d4',        // pembe
      'reactive_nonmetal_shade': '#fe52c4',

      'noble_gas': '#aa80ff',               // lila
      'noble_gas_shade': '#8b52fe',

      'lanthanides': '#c3ff80',              // yeşil
      'lanthanides_shade': '#adfe52',

      'actinides': '#80fffc',               // teal
      'actinides_shade': '#52fefa',

      'unknown': '#fff',               // beyaz
      'unknown_shade': '#e0e0e0'
    };
    return {
      modalViewable: false,
      colorCode: categoryColors[elementCategory] || '#fff',
      colorCodeShaded: categoryColors[elementCategory + '_shade'] || '#fff',
      states: {
        solid:      require("../resources/img/states/solid.svg"),
        liquid:     require("../resources/img/states/liquid.svg"),
        gas:        require("../resources/img/states/gas.svg"),
        uncertain:  require("../resources/img/states/uncertain.svg"),
      },
    };
  },
  computed: {
    heatState() {
      if (!this.heat_view) return '';

      if (this.element.boil_use !== "" && this.debouncedHeatValue >= this.element.boil_use)
        return "gas";
      else if (this.element.melt_use !== "" && this.debouncedHeatValue >= this.element.melt_use)
        return "liquid";
      else if (this.element.melt_use !== "" && this.debouncedHeatValue <= this.element.melt_use)
      return "solid";

      else
        return "uncertain";

    },
  },
  methods: {
    toggleModal($event) {
      let eventTarget = $event.target;

      if (eventTarget.classList.contains('close-modal') || eventTarget.classList.contains('overlay')) {
        this.modalViewable = false;
        return;
      }

      if (!eventTarget.closest('.table_elementBlock')) return;
      this.modalViewable = !this.modalViewable;
    },
  },
};
</script>


<style lang="scss" scoped>
  .table_elementContainer {
    height: 4.7vmax;
    width: 4.7vmax;
    
    border: 1px double #1d232f;
    border-radius: .3rem;
    
    background: rgb(39,47,63);
    background-image: linear-gradient(136deg, #272f3f 0%, #1d232f 100%);
    
    /* color: whitesmoke; */
    padding: .2vw;
    
    justify-self: flex-start;
    margin-top: -.13vw;

    filter: drop-shadow(0 0 1px rgba($color: #000000, $alpha: .5));

    // transition: all 0ms ease-in-out;
    &:hover {
      // filter: drop-shadow(0 0 .3vw v-bind(colorCode)) brightness(1.2);
      border: 1px solid rgba($color: #fff, $alpha: .2);
      filter: brightness(1.1);
      cursor: pointer;
    }
    &:active {
      // filter: drop-shadow(0 0 .3vw v-bind(colorCode));
      filter: brightness(.8);
    }
  }
  .uncertain {
    // box-shadow: 0px 0px .2vmin .1vmin #c7732f;
    color: #ee9038;
  }
  .solid {
    // box-shadow: 0px 0px .2vmin .1vmin #d5b7ff;
    color: #acbdff;
  }
  .liquid {
    // box-shadow: 0px 0px .2vmin .1vmin #acbdff;
    color: #46b4b2;
  }
  .gas {
    // box-shadow: 0px 0px .2vmin .1vmin #eb61b1;
    color: #eb61b1;
  }
  
  .colored {
    color: v-bind(colorCode);
    // .table_name { color: v-bind(colorCode); }
  }

  .glow {
    // box-shadow: 0 0 2px 0 rgba($color: #fff, $alpha: 1);
    border: 1px solid  rgba($color: #fff, $alpha: .3);    
    filter: drop-shadow(0 0 .4vw) !important;
  }

  .highlight {
    background: v-bind(colorCode);
    background-image: linear-gradient(130deg, v-bind(colorCode) 20%, v-bind(colorCodeShaded) 70%);
    // filter: drop-shadow(0 0 0 1rem v-bind(colorCode));
    color: black;
    // .table_name {
    //   color: black;
    // }
  }

  .table_atomicNumber {
    font-size: .25vh;
    opacity: .7;

    color: unset;
  }

  .table_symbol {
    margin-top: 2px;
    width: 100%;
    display: flex;
    justify-content: center;

    font-size: 1.5vmax;
    font-weight: bold;
    letter-spacing: normal;
    filter: drop-shadow(0 0 5px rgba(255,255,255, .1));
    // filter: drop-shadow(0 0 1px v-bind(colorCode));

    // &::before {
    //   position: absolute;
    //   content: "00";
    //   filter:blur(5px) opacity(.5);
    // }
  }
  .table_name {
    color: inherit;
    font-size: .45vw;
    opacity: .9;
    opacity: .7;
  }
  
  .table_atomicMass {
    font-weight: 100;
    font-size: .25vh;
    opacity: .7;
  }
  
  .heatState {
    display: inline-block;
    position: static;
    width: .7vw;
    height: .7vw;
  }

  .table_atomicNumberContainer {
    position: absolute; 
    top: 0.3vw;
    width: 85%;
  }
</style>