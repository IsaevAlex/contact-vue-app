<template>
    <div class="contactPage contactPage-margin">
        <div class="contactPage__profile">
            <img class="contactPage__img" src="https://www.fillmurray.com/460/300" alt="">
            <v-button @click="openAddValuesModal" type="info">Добавить новые поля</v-button>
        </div>
        <div class="contactPage__content contactPage__content-ml" >
            <div v-for="(value, key) in contact" :key="key">
                <div>
                    <h6>{{ key }}</h6>
                    <H2>{{ value }}</H2>
                    <div style="display: flex">
                        <div style="margin-right: 8px">
                            <v-button @click="callRemoveModal(key)" type="danger">Удалить</v-button>
                        </div>
                        <div>
                            <v-button @click="editContactValue" type="edit">Редактировать</v-button>
                        </div>
                    </div>
                </div>


            </div>
            <!--<div class="contactPage__header contactPage__header-mb">-->
                <!--<div class="contactTitle contactPage__name">-->
                    <!--{{ contact.firstName }}-->
                <!--</div>-->
                <!--<div class="contactTitle contactPage__firstname">-->
                    <!--{{ contact.lastName }}-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="contactPage__mail">-->
                <!--{{ contact.email }}-->
            <!--</div>-->
        </div>
        <v-remove-confirm-modal @removeContact="removeValuesFromContact" @close="closeModal" :show="showRemoveModal"></v-remove-confirm-modal>
        <v-add-values-to-contact-modal @addValuesToContact="addValuesToContact" @close="closeModal" :show="showModal"></v-add-values-to-contact-modal>
    </div>
</template>

<script>
    import VRemoveConfirmModal from '@/components/confirm/v-remove-confirm-modal';
    import VAddValuesToContactModal from '@/components/modal/v-add-values-to-contact-modal';
    import VButton from '@/components/button/v-button';

    export default {
        name: "Contact",
        components:{
            VRemoveConfirmModal,
            VButton,
            VAddValuesToContactModal
        },
        data(){
            return{
                contact: null,
                contacts: [],
                showModal: false,
                showRemoveModal: false,
                contactValueKey: null
            }
        },
        created(){
            this.contacts = localStorage.getItem('contacts') ? JSON.parse(localStorage.getItem('contacts')) : [];
            let contactId = this.$route.params.id;
            this.contact = this.contacts[contactId];
        },
        methods:{
            editContactValue(){
              console.log('edew');
            },
            removeValuesFromContact(){
                delete this.contact[this.contactValueKey];
                let contactId = this.$route.params.id;
                this.showRemoveModal = false;
                this.contacts[contactId] = this.contact;
                this.saveContacts(this.contacts);
            },
            callRemoveModal(key){
              this.showRemoveModal = true;
              this.contactValueKey = key;
            },
            openAddValuesModal(){
                this.showModal = true;
            },
            closeModal(){
                this.showModal = false;
                this.showRemoveModal = false;
            },
            addValuesToContact(items){
                let contactId = this.$route.params.id;
                this.contact = Object.assign(items, this.contact);
                this.contacts[contactId] = this.contact;
                this.saveContacts(this.contacts);
            },
            saveContacts(contacts) {
                let parsed = JSON.stringify(contacts);
                localStorage.setItem('contacts', parsed);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .contactPage{
        display: flex;
        &-margin{
            margin: 2em;
        }
        &__profile{
            display: flex;
            flex-direction: column;
        }
        &__img{
            border-radius: 10px;
            margin-bottom: 1em;
        }
        &__content{
            &-ml{
                margin-left: 1em;
            }
        }

        &__header{
            &-mb{
                margin-bottom: 1em;
            }
        }

        &__mail{
            font-size: 2.5rem;
            letter-spacing: .1rem;
            color: #3d3d3d;
            font-family: 'Lato', sans-serif;
        }

    }

    .contactTitle{
        font-size: 3em;
        font-weight: 500;
        color: #0d0d0d;
        font-family: 'Lato', sans-serif;
    }
</style>
