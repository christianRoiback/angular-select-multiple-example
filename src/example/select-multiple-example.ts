import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable, map, startWith } from 'rxjs';

/** @title Select with multiple selection */
@Component({
  selector: 'select-multiple-example',
  templateUrl: 'select-multiple-example.html',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    MatSelectModule,
    AsyncPipe,
  ],
})
export class SelectMultipleExample {
  toppings = new FormControl<string[]>([]);
  input = new FormControl('');
  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
    'Extra cheese1',
    'Mushroom1',
    'Onion1',
    'Pepperoni1',
    'Sausage1',
    'Tomato1',
    'Extra cheese2',
    'Mushroom2',
    'Onion2',
    'Pepperoni2',
    'Sausage2',
    'Tomato2',
    '3Extra cheese',
    '3Mushroom',
    '3Onion',
    '3Pepperoni',
    '3Sausage',
    '3Tomato',
  ];
  filteredOptions: Observable<string[]>;

  constructor() {
    this.toppings.valueChanges.subscribe((value) => {
      console.log('toppings: ', value);
    });
    this.filteredOptions = this.input.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  searchList(e: any): void {
    console.log(e);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const prev = this.toppings.value ? this.toppings.value : [];
    const result = [
      ...prev,
      ...this.toppingList.filter((option) =>
        option.toLowerCase().includes(filterValue)
      ),
    ];

    return [...new Set(result).values()].sort();
  }
}

/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
