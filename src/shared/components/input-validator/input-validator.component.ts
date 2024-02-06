import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '@shared/directives/directives.module';
import { PipesModule } from '@shared/pipes';
import { resolvePath } from '@shared/utils/path-resolver';

type ControlPath = FormControl | FormGroup;

@Component({
  selector: 'app-input-validator',
  standalone: true,
  imports: [CommonModule, TranslateModule, DirectivesModule, PipesModule],
  templateUrl: './input-validator.component.html',
  styleUrls: ['./input-validator.component.scss'],
})
export class InputValidatorComponent implements OnInit {
  @Input() showErrors!: boolean;
  @Input() form!: FormGroup;
  @Input() controlPath!: string;
  @Input() errorClass: string = 'input-errors__message';

  public controlHandle!: ControlPath;

  ngOnInit(): void {
    if (!this.controlPath) {
      this.controlHandle = this.form;
      return;
    }

    const formControls = this.form.controls;
    const pathLevels: string[] = this.controlPath.split('.');
    const pathLen: number = pathLevels.length;
    const deepPath: string =
      pathLen > 1
        ? pathLevels
            .map((pathLevel, index) =>
              index !== pathLen - 1 ? `${pathLevel}.controls` : pathLevel
            )
            .join('.')
        : this.controlPath;

    this.controlHandle = resolvePath<ControlPath>(
      formControls,
      deepPath,
      ''
    );
  }
}
