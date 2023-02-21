import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit{

  formHeroe = this.fb.group({
    id: [''],
    name: [ '', Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogComponent>,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.formHeroe.patchValue({
        id: this.data.id,
        name: this.data.name.toUpperCase()
      })
    }
  }

  onSubmit() {
    let newHero = this.formHeroe.value;
  this.onNoClick(newHero);
  }

  onNoClick(newHero?: object): void {
    if (newHero) {
      this.dialogRef.close(newHero);
    } else {
      this.dialogRef.close();
    }
  }

  toUpperCase(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.formHeroe.patchValue({
      name: target.value.toUpperCase()
    })
  }

}
