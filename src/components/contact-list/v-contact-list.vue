<template>
    <div class="contactList">
        <div class="contactList__list"  v-if="contacts.length > 0">
            <v-contact-item
                    v-for="(contact, index) in contacts"
                    :firstName="contact.firstName"
                    :lastName = "contact.lastName"
                    :email = "contact.email"
                    :key="index"
                    @callRemoveConfirm="callRemoveConfirm(index)"
            />
        </div>
        <div class="contactList__list" v-else>
            <h3 class="no-data">Нет контактов</h3>
        </div>
        <v-remove-confirm-modal @removeContact="removeContact" @closeModal="closeModal" :show="modalShow"></v-remove-confirm-modal>
    </div>
</template>

<script>
    import VRemoveConfirmModal from '@/components/confirm/v-remove-confirm-modal';
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
            VRemoveConfirmModal
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
