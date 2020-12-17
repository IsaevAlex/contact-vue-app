<template>
    <div class="contactProfileWrapper contactProfileWrapper-margin">
        <div class="contactProfileWrapper__back">
            <router-link to="/">
                <v-button>Список контактов</v-button>
            </router-link>
        </div>
        <div class="contactProfile">
            <div class="contactProfile__profile">
            <img class="contactProfile__img" src="../assets/images/user-profile.svg" alt="">
            <div class="contactProfile__btns">
                <div class="contactProfile__btn contactProfile__btn-mb">
                    <v-button @click="openAddValuesModal" size="full" type="info">Добавить новые поля</v-button>
                </div>
                <div class="contactProfile__btn" v-if="lastAction.nameAction.length > 0">
                    <v-button @click="backStepAction" size="full" type="success">Отменить действие</v-button>
                </div>
            </div>
        </div>
            <div class="contactProfile__content"  v-if="Object.keys(this.contact).length > 0" >
                <div v-for="(value, key) in contact" :key="key" class="contactProfile__item contactProfile__item-mb contactProfileItem">
                    <div v-if="editForm === key" class="contactProfileItem__edit contactProfileItemEdit">
                    <h5 class="contactProfileItemEdit__title contactProfileItemEdit__title-margin">Редактирование</h5>
                    <div class="contactProfileItemEdit__inputs">
                        <div class="contactProfileItemEdit__input">
                            <v-input :placeholder="key" v-model="values.key.newKey"></v-input>
                        </div>
                        <div class="contactProfileItemEdit__input">
                            <v-input :placeholder="value" v-model="values.value.newValue"></v-input>
                        </div>
                    </div>
                    <div class="contactProfileItemEdit__btns contactProfileItemEdit__btns-mt">
                        <div class="contactProfileItemEdit__btn contactProfileItemEdit__btn-mr">
                            <v-button  @click="callExitModal">Отмена</v-button>
                        </div>
                        <div class="contactProfileItemEdit__btn">
                            <v-button  @click="callSaveModal" type="info">Сохранить</v-button>
                        </div>
                    </div>
                </div>
                    <div v-else class="contactProfileItem__info">
                    <span class="contactProfileItem__subTitle contactProfileSubTitle">{{ key }}</span>
                    <span class="contactProfileItem__title contactProfileTitle">{{ value }}</span>
                    <div class="contactProfileItem__btns contactProfileItem__btns-mt">
                        <div class="contactProfileItem__btn contactProfileItem__btn-mr">
                            <v-button @click="callRemoveModal(key)" type="danger">Удалить</v-button>
                        </div>
                        <div class="contactProfileItem__btn">
                            <v-button @click="editContactValue(value,key)" type="edit">Редактировать</v-button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div v-else class="contactProfile__empty">
                <h2 class="no-data">Отсутствуют поля</h2>
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
            <v-add-values-to-contact-modal :contact="contact" @addValuesToContact="addValuesToContact" @close="closeModal" :show="showModal"></v-add-values-to-contact-modal>
        </div>
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
                lastAction : {
                    nameAction: '',
                    nameField:'',
                    valueField: '',
                    indexField: null,
                    indexContact: null,
                },
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
                contactId: this.$route.params.id,
                showSaveModal: false,
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
            setLastAction(nameAction, nameField, valueField, indexField, indexContact){
                this.lastAction.nameAction = nameAction;
                this.lastAction.nameField = nameField;
                this.lastAction.valueField = valueField;
                this.lastAction.indexField = indexField;
                this.lastAction.indexContact = indexContact;
            },
            backStepAction(){
                if (this.lastAction.nameAction === 'delete'){
                    this.$set(this.contact, this.lastAction.nameField, this.lastAction.valueField);
                    this.saveContacts(this.contacts);
                    this.setLastAction('add', this.lastAction.nameField, this.lastAction.valueField, this.lastAction.nameField, this.contactId )
                }
                else if (this.lastAction.nameAction === 'add'){
                    this.setLastAction('delete', this.lastAction.nameField, this.lastAction.valueField, this.lastAction.nameField, this.contactId );
                    this.$delete(this.contact, this.lastAction.nameField);
                    this.contacts[this.contactId] = this.contact;
                    this.saveContacts(this.contacts);
                }
                else if (this.lastAction.nameAction === 'change'){
                    if (this.values.key.oldKey !== this.values.key.newKey || this.values.value.oldValue !== this.values.value.newValue ) {

                        this.$set(this.contact, this.lastAction.nameField, this.values.value.oldValue);

                        if (this.values.key.oldKey !== this.values.key.newKey){
                            this.$delete(this.contact, this.lastAction.indexField );
                            let tmp = this.lastAction.indexField;
                            this.lastAction.indexField = this.lastAction.nameField;
                            this.lastAction.nameField = tmp;


                        }

                        let tmpValue = this.values.value.newValue;
                        this.values.value.newValue = this.values.value.oldValue;
                        this.values.value.oldValue = tmpValue;

                        this.contacts[this.contactId] = this.contact;







                        // let tmpValue = this.lastAction.nameField;
                        // this.lastAction.nameField = this.values.value.newValue;
                        // this.values.value.oldValue = tmpValue;



                        // const lastNameField = this.lastAction.nameField;
                        // const lastValueField = this.contact[this.lastAction.nameField];
                        // this.$set(this.contact, this.lastAction.nameField, this.lastAction.valueField);
                        //

                        // this.lastAction.nameField = lastNameField;
                        // this.lastAction.valueField = lastValueField;


                        // this.$set(this.contact, this.lastAction.nameField, this.lastAction.valueField);
                        // // this.setLastAction('change', this.values.key.newKey, this.lastAction.valueField, this.lastAction.indexField, this.contactId );
                        //
                        // this.setLastAction('change', this.values.key.oldKey, this.values.value.oldValue, this.values.key.newKey, this.contactId);
                        // // this.contacts[this.contactId] = this.contact;
                        //
                        //

                        this.saveContacts(this.contacts);
                    }

                    // if(nameAction === 'change') {
                    //     const lastNameField = path[indexField].name;
                    //     const lastValueField = path[indexField].value;
                    //     Vue.set(path, indexField, {
                    //         name: nameField,
                    //         value: valueField,
                    //     });
                    //     pathLastAction.nameField = lastNameField;
                    //     pathLastAction.valueField = lastValueField;
                    // }
                }

            },
            exitEditContact(){
                this.editForm = null;
                this.showExitModal = false;
            },
            saveEditChanges(){
                if (this.values.value.oldValue !== this.values.value.newValue){
                    this.contact[this.values.key.oldKey] = this.values.value.newValue;
                    // this.setLastAction('change', this.values.key.oldKey, this.values.value.newValue, this.values.key.newValue);

                }

                if (this.values.key.oldKey !== this.values.key.newKey) {
                    this.contact[this.values.key.newKey] = this.contact[this.values.key.oldKey];
                    // this.setLastAction('change', this.values.key.oldKey, this.contact[this.values.key.oldKey], this.values.key.newKey);
                    delete this.contact[this.values.key.oldKey];
                }

                this.setLastAction('change',
                                    this.values.key.oldKey,
                                    this.values.value.oldValue,
                                    this.values.key.newKey,
                                    this.contactId);

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
                let contactId = this.$route.params.id;
                this.setLastAction('delete', this.contactValueKey, this.contact[this.contactValueKey],Object.keys(this.contact).length, contactId);
                delete this.contact[this.contactValueKey];
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
                this.showModal = false;
                this.setLastAction('add', Object.keys(items).join(), Object.values(items).join(),Object.keys(this.contact).length, contactId);
            },
            saveContacts(contacts) {
                let parsed = JSON.stringify(contacts.reverse());
                localStorage.setItem('contacts', parsed);
            }
        }
    }
</script>

<style lang="scss" scoped>

    .contactProfileWrapper{
        &-margin{
                margin: 1em;

                @media screen and (min-width: 500px) {
                    margin: 2em;
                }
            }
        &__back{
            margin-bottom: 1em;
        }

    }

    .contactProfileItemEdit{
        &__title{
            font-size: 1.75em;
            color: #3d3d3d;
            font-weight: bold;
            font-family: 'Lato', sans-serif;
            word-break: break-all;

            &-margin{
                margin-top: 0;
                margin-bottom: 12px;
            }
        }

        &__btns{
            display: flex;
            justify-content: flex-end;

            &-mt{
                margin-top: 12px;
            }
        }

        &__btn{
            &-mr{
                margin-right: 8px;
            }
        }

        &__inputs{
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: 16px;

            @media screen and (min-width: 992px){
                grid-template-columns: 1fr 1fr;
            }
        }
    }

    .contactProfileItem{
        &__info{
            display: flex;
            flex-direction: column;
        }

        &__btn{
            &-mr{
                margin-right: 8px;
            }
        }

        &__btns{
            display: flex;

            &-mt{
                margin-top: 8px;
            }
        }
    }

    .contactProfileSubTitle{
        font-size: 1em;
        color: #3d3d3d;
        font-family: 'Lato', sans-serif;
        word-break: break-all;
    }

    .contactProfileTitle{
        font-size: 2em;
        color: #3d3d3d;
        font-weight: bold;
        font-family: 'Lato', sans-serif;
        word-break: break-all;
    }


    .contactProfile{
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1em;

        @media screen and (min-width: 600px){
            grid-template-columns: 1fr 1fr;
        }

        @media screen and (min-width: 992px){
            grid-template-columns: 1fr 2fr;
        }

        @media screen and (min-width: 1200px){
            grid-template-columns: 1fr 3fr;
            grid-gap: 2em;
        }

        @media screen and (min-width: 1400px){
            grid-template-columns: 300px 700px;
        }

        &__item{
            &-mb{
                margin-bottom: 1em;
            }
        }

        &__profile{
            display: flex;
            flex-direction: column;
        }

        &__btn{
            &-mb{
                margin-bottom: 8px;
            }
        }

        &__img{
            border-radius: 10px;
            margin-bottom: 1em;
            max-height: 200px;

            @media screen and (min-width: 600px) {
                max-height: auto;
            }
        }
    }

    .contactTitle{
        font-size: 3em;
        font-weight: 500;
        color: #0d0d0d;
        font-family: 'Lato', sans-serif;
    }
</style>
