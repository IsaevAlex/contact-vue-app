<template>
    <div class="contactPage">
        <h1 class="contactPage__title title">Страница контактов</h1>
        <v-button @click="clickButton" type="info">Добавить контакт</v-button>
        <v-add-contact-modal @close="closeModal" :show="visible"></v-add-contact-modal>
    </div>
</template>

<script>
    import VButton from '@/components/button/v-button';
    import VAddContactModal from "../components/modal/v-add-contact-modal";
    export default {
        name: "Contacts",
        components:{
            VAddContactModal,
            VButton
        },
        data(){
          return {
              visible: false
          }
        },
        methods:{
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
    }


</style>
