import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../commons/services/api.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


   articles: any=[];
  productTable: FormGroup;
  control: FormArray;
  mode: boolean;
  touchedRows: any;
  constructor(private apiService:ApiService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.touchedRows = [];
    this.productTable = this.fb.group({
      tableRows: this.fb.array([])
    });
    this.getAllArticels()

  }
  getAllArticels(){
    const recherche=""
    this.apiService.getAllArticles(recherche).subscribe((data:any)=>{
      this.articles=data;
      for (let i =0;i<this.articles.length;i++)
      {
        this.addRow()
        this.getRow(i).setValue(this.articles[i])
      }
      // let obj={tableRows:this.articles}
      // this.productTable.patchValue(obj)

    })
  }
  tableRows(){
    return this.productTable.get("tableRows") as FormArray
  }
  getRow(ti): FormArray {
    return this.tableRows().at(ti) as FormArray
  }



  initiateForm(): FormGroup {
    return this.fb.group({
      id: [''],
      designation: ['', [Validators.email, Validators.required]],
      prix: ['', [Validators.required]],
      referenceArticle: [''],
      stock: ['', [Validators.required, Validators.maxLength(10)]],
      isEditable: [true]
    });
  }

  addRow() {
    const control =  this.productTable.get('tableRows') as FormArray;
    control.push(this.initiateForm());
  }

  deleteRow(index: number) {
    const control =  this.productTable.get('tableRows') as FormArray;
    control.removeAt(index);
    this.apiService.deleteArticle(control.at(index).get("id").value)
  }

  editRow(group: FormGroup) {
    group.get('isEditable').setValue(true);
  }

  doneRow(group: FormGroup) {
    this.apiService.putArticle(group.get("id").value,group.value).subscribe((data:any)=>{
      console.log(data);
    })
    group.get('isEditable').setValue(false);
  }

  saveUserDetails() {
    console.log(this.productTable.value);
  }

  get getFormControls() {
    const control = this.productTable.get('tableRows') as FormArray;
    return control;
  }

  submitForm() {
    const control = this.productTable.get('tableRows') as FormArray;
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
    console.log(this.touchedRows);
    this.apiService.postArticles(this.touchedRows).subscribe((data:any)=>{
      console.log(data);
    })
  }
}
