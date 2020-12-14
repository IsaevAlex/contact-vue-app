<template>
    <div class="contactPage contactPage-margin">
        <div class="contactPage__profile">
            <img class="contactPage__img" src="https://www.fillmurray.com/460/300" alt="">
            <v-button @click="openAddValuesModal" type="info">Добавить новые поля</v-button>
        </div>
        <div class="contactPage__content contactPage__content-ml" >
            <div v-for="(value, key) in contact" :key="key">
                <div v-if="editForm === key">
                        <h2>Редактирование</h2>
                        <v-input :placeholder="key" v-model="values.key.newKey"></v-input>
                        <v-input :placeholder="value" v-model="values.value.newValue"></v-input>
                    <v-button  @click="callSaveModal" type="info">Сохранить</v-button>
                    <v-button  @click="callExitModal">Отмена</v-button>
                </div>
                <div v-else>
                    <h6>{{ key }}</h6>
                    <H2>{{ value }}</H2>
                    <div style="display: flex">
                        <div style="margin-right: 8px">
                            <v-button @click="callRemoveModal(key)" type="danger">Удалить</v-button>
                        </div>
                        <div>
                            <v-button @click="editContactValue(value,key)" type="edit">Редактировать</v-button>
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
        <v-confirm-modal
                type="exit"
                title="Отмена редактирования"
                description="Вы действительно хотите отменить редактирование?"
                @exitEditContact="exitEditContact"
                @close="closeModal"
                :show="showExitModal"
        />
        <v-confirm-modal
                type="save"
                title="Редактирование записи"
                description="Вы действительно хотите обновить запись?"
                @saveEditChanges="saveEditChanges"
                @close="closeSaveModal"
                :show="showSaveModal"
        />
        <v-confirm-modal
                type="remove"
                title="Удаление записи"
                description="Вы действительно хотите удалить запись?"
                @removeContact="removeValuesFromContact"
                @close="closeModal"
                :show="showRemoveModal"
        />
        <v-add-values-to-contact-modal @addValuesToContact="addValuesToContact" @close="closeModal" :show="showModal"></v-add-values-to-contact-modal>
    </div>
</template>

<script>
    import VInput from '@/components/input/v-input';
    import VConfirmModal from '@/components/confirm/v-confirm-modal';
    import VAddValuesToContactModal from '@/components/modal/v-add-values-to-contact-modal';
    import VButton from '@/components/button/v-button';

    export default {
        name: "Contact",
        components:{
            VInput,
            VConfirmModal,
            VButton,
            VAddValuesToContactModal
        },
        data(){
            return{
                values:{
                    key: {
                        oldKey: '',
                        newKey: ''
                    },
                    value: {
                        oldValue: '',
                        newValue: ''
                    }
                },
                showSaveModal: false,
                title: 'qweqwe',
                contact: null,
                contacts: [],
                showModal: false,
                showRemoveModal: false,
                showExitModal: false,
                contactValueKey: null,
                editForm: null
            }
        },
        created(){
            this.contacts = localStorage.getItem('contacts') ? JSON.parse(localStorage.getItem('contacts')).reverse() : [];
            let contactId = this.$route.params.id;
            this.contact = this.contacts[contactId];
        },
        methods:{
            exitEditContact(){
                this.editForm = null;
                this.showExitModal = false;
            },
            saveEditChanges(){
                if (this.values.key.oldKey !== this.values.key.newKey) {
                    this.contact[this.values.key.newKey] = this.contact[this.values.key.oldKey];
                    delete this.contact[this.values.key.oldKey];
                }
                if (this.values.value.oldValue !== this.values.value.newValue){
                    console.log(this.contact[this.values.key.oldValue]);
                    this.contact[this.values.key.oldKey] = this.values.value.newValue;
                }
                this.editForm = null;
                this.showSaveModal = false;
                this.saveContacts(this.contacts);

            },
            editContactValue(value,key){
              this.editForm = key;
              this.values.key.newKey = key;
              this.values.key.oldKey = key;
              this.values.value.newValue = value;
              this.values.value.oldValue = value;
            },
            removeValuesFromContact(){
                delete this.contact[this.contactValueKey];
                let contactId = this.$route.params.id;
                this.showRemoveModal = false;
                this.contacts[contactId] = this.contact;
                this.saveContacts(this.contacts);
            },
            callExitModal(){
                this.showExitModal = true;
            },
            callSaveModal(){
                this.showSaveModal = true;
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
                this.showExitModal = false;
            },
            closeSaveModal(){
                this.showSaveModal = false;
                this.values.key.newKey = this.values.key.oldKey;
                this.values.value.newValue = this.values.value.oldValue;
            },
            addValuesToContact(items){
                let contactId = this.$route.params.id;
                this.contact = Object.assign(this.contact, items);
                this.contacts[contactId] = this.contact;
                this.saveContacts(this.contacts);
            },
            saveContacts(contacts) {
                let parsed = JSON.stringify(contacts.reverse());
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
