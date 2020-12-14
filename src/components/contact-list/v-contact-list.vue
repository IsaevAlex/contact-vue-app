<template>
    <div class="contactList">
        <div class="contactList__list"  v-if="contacts.length > 0">
            <v-contact-item
                    v-for="(contact, index) in contacts"
                    :firstName="contact.firstName"
                    :lastName = "contact.lastName"
                    :email = "contact.email"
                    :index="index"
                    :key="index"
                    @callRemoveConfirm="callRemoveConfirm(index)"
            />
        </div>
        <div class="contactList__list" v-else>
            <h3 class="no-data">Нет контактов</h3>
        </div>
        <v-confirm-modal title="Удаление контакта" description="Вы действительно хотите удалить контакт?" type="remove" @removeContact="removeContact" @close="closeModal" :show="modalShow"></v-confirm-modal>
    </div>
</template>

<script>
    import VConfirmModal from '@/components/confirm/v-confirm-modal';
    import VContactItem from '@/components/contact/v-contact-item';
    export default {
        name: "v-contact-list",
        data(){
          return{
              modalShow: false,
              contactIndex: null
          }
        },
        components:{
            VContactItem,
            VConfirmModal
        },
        props:{
            contacts: {
                type: Array,
                required: true
            }
        },
        methods:{
            callRemoveConfirm(index){
                this.modalShow = true;
                this.contactIndex = index;
            },
            removeContact(){
                this.contacts.splice(this.contactIndex, 1);
                localStorage.setItem('contacts', JSON.stringify(this.contacts));
                this.closeModal();
            },
            closeModal(){
                this.modalShow = false;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '@/assets/styles/layout';

</style>
