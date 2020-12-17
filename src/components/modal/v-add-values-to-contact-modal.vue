<template>
    <v-modal class="addContactModal" v-show="show">
        <div slot="header">
            <h2 class="addContactModal__header">Добавление полей в контакт</h2>
        </div>
        <div slot="body">
            <div class="addContactModal__body">
                <div class="addContactModal__input addContactModal__input-mb">
                    <v-input :placeholder="placeholders.newName" v-model="newName"></v-input>
                </div>
                <div class="addContactModal__input addContactModal__input-mb">
                    <v-input :placeholder="placeholders.newValue" v-model="newValue"></v-input>
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
                        <v-button @click="addValuesToContact" type="info">Добавить поля</v-button>
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
            contact: {
              type: Object,
              required: true
            },
            show:{
                type: Boolean,
                default:false
            }
        },
        data(){
            return{
                placeholders: {
                    newName: 'Новое имя поля',
                    newValue: 'Новое значение'
                },
                newName: '',
                newValue: '',
                itemsArray: [],
                errorText: ''
            }
        },
        created() {
            this.itemsArray = localStorage.getItem('contacts') ? JSON.parse(localStorage.getItem('contacts')).reverse() : [];
        },
        methods:{
            closeModal(){
                this.$emit('close');
                this.errorText = '';
            },
            addValuesToContact(){
                if (this.checkLengthValueInInput(this.newName.length, this.newValue.length)){
                    if (this.checkExistsKey(this.contact, this.newName)){
                        let items = {};
                        items[this.newName.trim()] = this.newValue.trim();
                        this.$emit('addValuesToContact', items);
                        this.newName = ' ';
                        this.newValue = ' ';
                        items = {};
                        this.$emit('addContactToPage', items);
                        this.errorText = '';
                    }
                    else{
                        this.errorText = 'Такое свойство уже существует';
                    }

                }
                else{
                    this.errorText = 'Все поля должны быть заполнены';
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
        &__error{
            &-margin{
                margin-right: 8px;
                margin-bottom: 9px;
            }
        }

        &__btns{
            display: flex;
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
