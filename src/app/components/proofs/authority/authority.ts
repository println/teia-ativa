import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UiSection, UiSectionHeaderDirective } from '@app/components/shared/ui-section/ui-section';
import { Profile } from './profile.model';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-authority',
  templateUrl: './authority.html',
  styleUrl: './authority.scss',
  standalone: true,
  imports: [NgClass, UiSection, UiSectionHeaderDirective],
  providers: [
    ProfileService
  ]
})
export class Authority implements OnInit {
  activeSpecialist: number | null = null;
  specialists: Profile[] = [];

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getProfiles().subscribe({
      next: (profiles) => {
        this.specialists = profiles;
      },
      error: (err) => console.error('Failed to load profiles', err)
    });
  }

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
