<template>
    <v-modal class="removeConfirmModal" v-show="show">
        <div slot="header">
            <h2 class="removeConfirmModal__header">{{ title }}</h2>
        </div>
        <div slot="body">
            <span>
                {{ description }}
            </span>
        </div>
        <div slot="footer">
            <div class="removeConfirmModal__footer" v-if="type === 'remove'">
                <div class="removeConfirmModal__btn removeConfirmModal__btn-mr removeConfirmModal__btn-close">
                    <v-button @click="closeModal">Отмена</v-button>
                </div>
                <div class="removeConfirmModal__btn removeConfirmModal__btn-submit">
                    <v-button @click="makeAction" type="danger">Удалить</v-button>
                </div>
            </div>
            <div class="removeConfirmModal__footer" v-else-if="type === 'exit'">
                <div class="removeConfirmModal__btn removeConfirmModal__btn-mr removeConfirmModal__btn-close">
                    <v-button @click="closeModal">Отмена</v-button>
                </div>
                <div class="removeConfirmModal__btn removeConfirmModal__btn-submit">
                    <v-button @click="makeAction" type="info">Отменить редактирование</v-button>
                </div>
            </div>
            <div class="removeConfirmModal__footer" v-else>
                <div class="removeConfirmModal__btn removeConfirmModal__btn-mr removeConfirmModal__btn-close">
                    <v-button @click="closeModal">Отмена</v-button>
                </div>
                <div class="removeConfirmModal__btn removeConfirmModal__btn-submit">
                    <v-button @click="makeAction" type="info">Сохранить</v-button>
                </div>
            </div>
        </div>
    </v-modal>
</template>

<script>
    import VButton from '@/components/button/v-button';
    import VModal from '@/components/modal/v-modal';

    export default {
        name: "v-confirm-modal",
        components:{
            VModal,
            VButton
        },
        props:{
            title:{
              type: String,
              default: 'Сохранение контакта'
            },
            description:{
                type: String,
                default: 'Вы действительно хотите сохранить'
            },
            type:{
              type: String,
              default: 'save'
            },
            show:{
                type: Boolean,
                default: false
            }
        },
        methods:{
            closeModal(){
                this.$emit('close');
            },
            makeAction(){
              if (this.type === 'remove'){
                  this.removeContact();
              }
              else if (this.type === 'exit'){
                  this.exitEditContact();
              }
              else if (this.type === 'save'){
                  this.saveContact();
              }
            },
            saveContact(){
                this.$emit('saveEditChanges');
            },
            removeContact(){
                this.$emit('removeContact');
            },
            exitEditContact(){
                this.$emit('exitEditContact');
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
