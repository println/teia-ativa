import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dream',
  imports: [NgIf],
  templateUrl: './dream.html',
  styleUrl: './dream.scss',
})
export class Dream implements OnInit {
  type: string = 'empresa';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // Check data
    this.route.data.subscribe(data => {
      if (data['type']) {
        this.type = data['type'];
      }
    });
    // Check params if needed (optional flex)
    this.route.params.subscribe(params => {
      if (params['type']) {
        this.type = params['type'];
      }
    });
  }
}
