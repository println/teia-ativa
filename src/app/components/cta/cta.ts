import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppSettings } from '../../config/app.config';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cta.html',
  styleUrl: './cta.scss',
})
export class Cta {
  contacts = AppSettings.contacts;
  generalContact = AppSettings.contact;
  selectedContact = this.contacts[0];
  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  baseMessage = 'Vim pelo site da Teia Ativa e gostaria de falar com um especialista sobre as consultorias e treinamentos para minha organização';

  organizationOptions = ['Escola', 'Empresa', 'Organização', 'Governo'];
  selectedOrgs: string[] = [];

  formData = {
    name: '',
    message: this.baseMessage + '.'
  };

  selectContact(contact: any) {
    this.selectedContact = contact;
    this.nameInput.nativeElement.focus();
  }

  toggleOrg(org: string) {
    const index = this.selectedOrgs.indexOf(org);
    if (index > -1) {
      this.selectedOrgs.splice(index, 1);
    } else {
      this.selectedOrgs.push(org);
    }
    this.selectedOrgs.sort((a, b) => this.organizationOptions.indexOf(a) - this.organizationOptions.indexOf(b));
    this.updateMessage();
  }

  updateMessage() {
    if (this.selectedOrgs.length === 0) {
      this.formData.message = this.baseMessage + '.';
      return;
    }

    const lastOrg = this.selectedOrgs[this.selectedOrgs.length - 1];
    const otherOrgs = this.selectedOrgs.slice(0, -1);

    let orgsText = '';
    if (otherOrgs.length > 0) {
      orgsText = otherOrgs.join(', ') + ' e ' + lastOrg;
    } else {
      orgsText = lastOrg;
    }

    this.formData.message = this.baseMessage + ': ' + orgsText + '.';
  }

  sendMessage() {
    const phone = this.selectedContact.whatsapp.replace(/\D/g, '');
    const text = `Olá ${this.selectedContact.name}, meu nome é ${this.formData.name}. ${this.formData.message}`;
    
    // Detecta se é dispositivo móvel (incluído "Focus" para Firefox Focus)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Focus/i.test(navigator.userAgent);

    if (isMobile) {
      // No mobile, usamos o protocolo direto que pula a página intermediária e abre o App na mesma hora.
      const urlApp = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(text)}`;
      window.location.href = urlApp;
    } else {
      // No desktop, usamos o wa.me para que haja o fallback elegante para o WhatsApp Web.
      const urlWeb = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
      window.open(urlWeb, '_blank');
    }
  }
}
