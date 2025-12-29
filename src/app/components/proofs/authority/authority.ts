import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-authority',
  templateUrl: './authority.html',
  styleUrl: './authority.scss',
})
export class Authority {
  activeSpecialist: number | null = null;

  toggleEspecialista(id: number) {
    if (this.activeSpecialist === id) {
      this.activeSpecialist = null;
    } else {
      this.activeSpecialist = id;
    }
  }

  isOpen(id: number): boolean {
    return this.activeSpecialist === id;
  }
}
