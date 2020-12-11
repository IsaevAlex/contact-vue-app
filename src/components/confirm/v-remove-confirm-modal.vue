<template>
    <v-modal class="removeConfirmModal" v-show="show">
        <div slot="header">
            <h2 class="removeConfirmModal__header">Удаление контакта</h2>
        </div>
        <div slot="body">
            <span>Вы уверены что хотите удалить контакт?</span>
        </div>
        <div slot="footer">
            <div class="removeConfirmModal__footer">
                <div class="removeConfirmModal__btn removeConfirmModal__btn-mr removeConfirmModal__btn-close">
                    <v-button @click="closeModal">Отмена</v-button>
                </div>
                <div class="removeConfirmModal__btn removeConfirmModal__btn-submit">
                    <v-button @click="removeContact" type="danger">Удалить</v-button>
                </div>
            </div>
        </div>
    </v-modal>
</template>

<script>
    import VButton from '@/components/button/v-button';
    import VModal from '@/components/modal/v-modal';

    export default {
        name: "v-remove-confirm-modal",
        components:{
            VModal,
            VButton
        },
        props:{
            show:{
                type: Boolean,
                default:false
            }
        },
        methods:{
            closeModal(){
                this.$emit('close');
            },
            removeContact(){
                this.$emit('removeContact');
            }
        }
    }

</script>

<style scoped lang="scss">
    .removeConfirmModal{
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
