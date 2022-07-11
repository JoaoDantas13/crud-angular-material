import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  freshnessList = ['Brand New', 'Second Hand', 'Refurbished'];
  productForm!: FormGroup;
  actionBtn: string = 'Salvar';
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      produtoNome: ['', Validators.required],
      categoria: ['', Validators.required],
      freshness: ['', Validators.required],
      preco: ['', Validators.required],
      comentario: ['', Validators.required],
      date: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Editar';
      this.productForm.controls['produtoNome'].setValue(
        this.editData.produtoNome
      );
      this.productForm.controls['categoria'].setValue(this.editData.categoria);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['preco'].setValue(this.editData.preco);
      this.productForm.controls['comentario'].setValue(
        this.editData.comentario
      );
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }
  addProduto() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProduto(this.productForm.value).subscribe({
          next: (data) => {
            alert('Produto adicionado com sucesso');
            this.productForm.reset();
            this.dialogRef.close('Salvo');
          },
          error: () => {
            alert('Erro ao adicionar produto');
          },
        });
      }
    } else {
      this.editarProduto();
    }
  }

  editarProduto(): void {
    this.api.putProduto(this.productForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Produto alterado com sucesso!');
        this.productForm.reset();
        this.dialogRef.close('editar');
      },
      error: () => {
        alert('Erro ao alterar produto');
      },
    });
  }
}
