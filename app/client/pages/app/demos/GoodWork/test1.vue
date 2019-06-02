<template>
    <p>
        <v-combobox
                v-model="model"
                :filter="filter"
                :hide-no-data="!search"
                :items="items"
                allow-overflow
                :search-input.sync="search"
                hide-selected
                label="Search for an option"
                multiple
                small-chips
                solo
                dense
                id="box"
                :menu-props="menu"

        >
            <!--Entered new values-->
            <template v-slot:no-data>
                <v-list-tile>
                    <v-chip dark label small
                            v-on:click="add_text"
                    >
                        {{ search}}
                    </v-chip>
                </v-list-tile>
            </template>
            <!--Selected Items-->
            <template v-slot:selection="{ item, parent, selected }">
                <v-chip
                        :selected="selected"
                        label
                        small
                >
                    <span class="pr-2">{{ item}}</span>
                    <v-icon small @click="parent.selectItem(item)">x</v-icon>
                </v-chip>
            </template>
            <!--The drop down menu-->
            <template v-slot:item="{ index, item }">
                <v-text-field
                        v-if="editing === item"
                        v-model="editing"
                        autofocus
                        flat
                        background-color="transparent"
                        hide-details
                        solo
                        @keyup.enter="edit(index, item)"
                ></v-text-field>
                <v-chip
                        @click="closeit()"
                        v-else
                        dark
                        label
                        small
                >
                    {{ item }}
                </v-chip>
            </template>
        </v-combobox>
    </p>

</template>

<script>
  export default {
    name: "test1",
    props: {
      items_param: {
        type: Array,
        required: true
      },
    },
    data() {
      return {
        count: 0,
        activator: null,
        attach: null,
        colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
        editing: null,
        index: -1,
        nonce: 1,
        menu: false,
        x: 0,
        search: null,
        y: 0,
        model: [],
        items: [{header: 'Select an option or create one'}].concat(this.items_param),
        menu: {"maxHeight": 150, "overflowY": true, "closeOnContentClick": false}//, auto: true, overflowY: true }"
      }
    },
    watch: {
      model(val, prev) {
        if (val.length === prev.length) return;
        this.model = val.map(v => {
          if (typeof v === 'string') {

            this.items.push(v);

            this.nonce++
          }

          return v
        });
        this.$emit("input", val)

      },


    },

    methods: {
      edit(index, item) {
        if (!this.editing) {
          this.editing = item;
          this.index = index
        } else {
          this.editing = null;
          this.index = -1
        }
      },
      filter(item, queryText, itemText) {
        if (item.header) return false

        const hasValue = val => val != null ? val : ''

        const text = hasValue(itemText)
        const query = hasValue(queryText)

        return text.toString()
            .toLowerCase()
            .indexOf(query.toString().toLowerCase()) > -1
      },
      add_text: function (e) {
        this.model.push(this.search);
        //let x = document.getElementById("box");
        this.search = null;
        let x = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        console.log(x);
        x.focus();
      },
      closeit: function () {
        let x = document.getElementById("box");
      }

    }
  }
</script>

<style scoped>
    .v-subheader {

        /* height: 48px; */
        font-size: 14px;
        font-weight: 500;
        padding: 0 16px;
    }
</style>