<template>
    <v-modal class="addContactModal" v-show="show">
        <div slot="header">
            <h2 class="addContactModal__header">Добавление контакта</h2>
        </div>
        <div slot="body">
            <div class="addContactModal__body">
                <div class="addContactModal__input addContactModal__input-mb">
                    <v-input :autofocus="autofocus" :placeholder="placeholders.firstName" v-model="firstName"></v-input>
                </div>
                <div class="addContactModal__input addContactModal__input-mb">
                    <v-input :placeholder="placeholders.lastName" v-model="lastName"></v-input>
                </div>
                <div class="addContactModal__input">
                    <v-input :placeholder="placeholders.email" v-model="email"></v-input>
                </div>
            </div>
        </div>
        <div slot="footer">
            <div class="addContactModal__footer">
                <div class="addContactModal__error addContactModal__error-margin">
                    <span class="errorText">{{ errorText }}</span>
                </div>
                <div class="addContactModal__btns">
                    <div class="addContactModal__btn addContactModal__btn-mr addContactModal__btn-close">
                        <v-button @click="closeModal">Закрыть</v-button>
                    </div>
                    <div class="addContactModal__btn addContactModal__btn-submit">
                        <v-button @click="addContact" type="info">Добавить контакт</v-button>
                    </div>
                </div>
            </div>
        </div>
    </v-modal>
</template>

<script>
    import checkLengthMixin from '@/mixins/checkLengthMixin';

    import VInput from '@/components/input/v-input';
    import VButton from '@/components/button/v-button';
    import VModal from '@/components/modal/v-modal';
    export default {
        name: "v-add-contact-modal",
        components:{
            VModal,
            VButton,
            VInput
        },
        mixins:[
            checkLengthMixin
        ],
        props:{
            show:{
                type: Boolean,
                default:false
            }
        },
        data(){
            return{
                placeholders: {
                    firstName: 'Имя',
                    lastName: 'Фамилия',
                    email: 'Email'
                },
                autofocus: false,
                firstName: '',
                lastName: '',
                email: '',
                itemsArray: [],
                errorText: ''
            }
        },
        watch:{
            show(value){
                if (value){
                    this.autofocus = true;
                }
                else{
                    this.autofocus = false;
                }
            }
        },
        created() {
            this.itemsArray = localStorage.getItem('contacts') ? JSON.parse(localStorage.getItem('contacts')) : [];
        },
        methods:{
            closeModal(){
                this.$emit('close');
                this.errorText = '';
            },
            addContact(){
                let items = {
                    'firstName': this.firstName.trim(),
                    'lastName': this.lastName.trim(),
                    'email': this.email.trim()
                };
                if (this.checkLengthValueInInput(this.firstName.length, this.lastName.length, this.email.length)){
                    this.itemsArray.push(items);
                    this.firstName = ' ';
                    this.lastName = ' ';
                    this.email = ' ';
                    this.saveContacts();
                    this.$emit('addContactToPage', items);
                    this.closeModal();
                }
                else{
                    this.errorText = 'Все поля должны быть заполненными';
                }

            },
            saveContacts() {
                let parsed = JSON.stringify(this.itemsArray);
                localStorage.setItem('contacts', parsed);
            }

        }
    }
</script>

<style scoped lang="scss">
    .addContactModal{
        &__footer{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: flex-end;

            @media screen and (min-width: 600px) {
                justify-content: space-between;
            }
        }

        &__btns{
            display: flex;
        }

        &__error{
            &-margin{
                margin-right: 8px;
                margin-bottom: 9px;
            }
        }
        &__btn{
            &-mr{
                margin-right: 8px;
            }
        }
        &__input{
            &-mb{
                margin-bottom: 1em;
            }
        }
    }
</style>
