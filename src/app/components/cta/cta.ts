import { Component } from '@angular/core';
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

  baseMessage = 'Olá! Vim pelo site da Teia Ativa e gostaria de falar com um especialista sobre as consultorias e treinamentos para minha organização';

  organizationOptions = ['Escola', 'Empresa', 'Setor Público'];
  selectedOrgs: string[] = [];

  formData = {
    name: '',
    message: this.baseMessage + '.'
  };

  selectContact(contact: any) {
    this.selectedContact = contact;
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
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }
}
