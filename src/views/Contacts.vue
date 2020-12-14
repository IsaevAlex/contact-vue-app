<template>
    <div class="contactPage">
        <h1 class="contactPage__title title">Страница контактов</h1>
        <div class="contactPage__btn">
            <v-button @click="clickButton" type="info">Добавить контакт</v-button>
        </div>
        <div class="contactPage__modal">
            <v-add-contact-modal @addContactToPage="addContactToPage" @close="closeModal" :show="visible"></v-add-contact-modal>
        </div>
        <div class="contactPage__list contactPage__list-mt">
            <v-contact-list :contacts="reverseItems"></v-contact-list>
        </div>
    </div>
</template>

<script>
    import VContactList from '@/components/contact-list/v-contact-list';
    import VButton from '@/components/button/v-button';
    import VAddContactModal from "../components/modal/v-add-contact-modal";
    export default {
        name: "Contacts",
        components:{
            VAddContactModal,
            VButton,
            VContactList
        },
        data(){
          return {
              visible: false,
              items: []
          }
        },
        mounted(){
            this.items = localStorage.getItem('contacts') ? JSON.parse(localStorage.getItem('contacts')) : [];
        },
        computed:{
          reverseItems(){
              return [...this.items].reverse();
            }
        },
        methods:{
            addContactToPage(itemsParty){
                this.items.push(itemsParty);
            },
            clickButton(){
                this.visible = !this.visible;
            },
            closeModal(){
                this.visible = false;
            }
        }

    }
</script>

<style lang="scss" scoped>
    @import '@/assets/styles/layout';

    .contactPage{
        display: flex;
        align-items: center;
        flex-direction: column;

        &__list{
            &-mt{
                margin-top: 2em;
            }
        }
    }


</style>
