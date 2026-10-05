import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { APP } from '../../core/config/app-links';
import { LegalLayout } from '../../shared/components/legal-layout/legal-layout';

/** Página exigida por Google Play para apps con creación de cuenta (Seguridad de los datos). */
@Component({
  selector: 'app-delete-account',
  imports: [RouterLink, LegalLayout],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-legal-layout title="Eliminar tu cuenta de JChapín" updatedAt="2026-10-04">
      <p>
        Puedes pedir que eliminemos tu cuenta de <strong>{{ app.name }}</strong> y los datos asociados en
        cualquier momento, sin costo.
      </p>

      <h2>Cómo pedir la eliminación</h2>
      <ol>
        <li>
          Escríbenos a <a [href]="mailto">{{ app.contactEmail }}</a> desde el
          <strong>mismo correo</strong> con el que inicias sesión en la app.
        </li>
        <li>Usa el asunto <strong>"Eliminar mi cuenta"</strong>.</li>
        <li>
          Te responderemos para confirmar la solicitud. Una vez confirmada, eliminamos tu cuenta en un
          plazo máximo de <strong>30 días</strong>.
        </li>
      </ol>
      <p>
        <a [href]="mailto" class="btn-primary no-underline">Enviar solicitud por correo</a>
      </p>

      <h2>Qué datos se eliminan</h2>
      <ul>
        <li>Tu perfil: nombre, correo, foto y ubicación guardada.</li>
        <li>Tus reservas, tickets y eventos marcados con "Voy".</li>
        <li>Tus notificaciones y los identificadores de tus dispositivos.</li>
        <li>Tus roles y permisos dentro de la app.</li>
      </ul>

      <h2>Qué datos podemos conservar</h2>
      <ul>
        <li>
          Las reseñas que publicaste pueden mantenerse de forma <strong>anónima</strong>, sin tu nombre.
        </li>
        <li>
          Si eres organizador, los eventos ya realizados pueden conservarse de forma anónima para los
          reportes históricos de la municipalidad.
        </li>
        <li>La información que la ley nos obligue a conservar, solo durante el plazo exigido.</li>
      </ul>

      <h2>Solo quieres dejar de recibir avisos</h2>
      <p>
        Si no quieres eliminar tu cuenta, puedes desactivar las notificaciones o el permiso de ubicación
        desde los ajustes de Android. Más información en la
        <a routerLink="/privacidad">Política de privacidad</a>.
      </p>
    </app-legal-layout>
  `,
})
export default class DeleteAccount {
  protected readonly app = APP;
  protected readonly mailto = `mailto:${APP.contactEmail}?subject=${encodeURIComponent('Eliminar mi cuenta')}`;
}
