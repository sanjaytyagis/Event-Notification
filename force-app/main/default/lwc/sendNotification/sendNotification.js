import { LightningElement } from 'lwc';
import getNotification from '@salesforce/apex/SendNotification.getNotify';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from 'lightning/actions';

export default class SendNotification extends LightningElement {
    
    handleClick() {
        getNotification()
          .then((result) => {
            console.log('Notification Received');
          })
          .catch((error) => {
            console.log('Error received');
          });
          this.dispatchEvent(new CloseActionScreenEvent());

          const evt = new ShowToastEvent({
            title: 'Toast Success',
            message: 'Opearion sucessful',
            variant: 'success',
            mode: 'dismissable'
        });
        
        this.dispatchEvent(evt);
      }

}