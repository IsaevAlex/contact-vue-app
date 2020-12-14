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
                <div class="addContactModal__btn addContactModal__btn-mr addContactModal__btn-close">
                    <v-button @click="closeModal">Закрыть</v-button>
                </div>
                <div class="addContactModal__btn addContactModal__btn-submit">
                    <v-button @click="addValuesToContact" type="info">Добавить поля</v-button>
                </div>
            </div>
        </div>
    </v-modal>
</template>

<script>
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
        props:{
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
                itemsArray: []
            }
        },
        created() {
            this.itemsArray = localStorage.getItem('contacts') ? JSON.parse(localStorage.getItem('contacts')).reverse() : [];
        },
        methods:{
            closeModal(){
                this.$emit('close');
            },
            addValuesToContact(){
                let items = {};
                items[this.newName.trim()] = this.newValue.trim();
                this.$emit('addValuesToContact', items);
                this.newName = ' ';
                this.newValue = ' ';
                items = {};
                this.$emit('addContactToPage', items);
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
            justify-content: flex-end;
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
