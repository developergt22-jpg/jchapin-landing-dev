import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { APP } from '../../core/config/app-links';
import { LegalLayout } from '../../shared/components/legal-layout/legal-layout';

@Component({
  selector: 'app-terms',
  imports: [RouterLink, LegalLayout],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-legal-layout title="Términos de uso" updatedAt="2026-10-04">
      <p>
        Al usar <strong>{{ app.name }}</strong> aceptas estos términos. Si no estás de acuerdo, no uses la
        app.
      </p>

      <h2>1. El servicio</h2>
      <p>
        {{ app.name }} permite descubrir eventos, reservar entradas con código QR, publicar y administrar
        eventos y, en su caso, gestionar su aprobación municipal. La app está en fase
        <strong>beta</strong>: puede tener errores, cambiar o dejar de estar disponible temporalmente.
      </p>

      <h2>2. Tu cuenta</h2>
      <ul>
        <li>Debes dar información verdadera y mantener segura tu cuenta.</li>
        <li>Eres responsable de la actividad que ocurra con tu cuenta.</li>
        <li>Podemos suspender cuentas que incumplan estos términos.</li>
      </ul>

      <h2>3. Reservas y tickets</h2>
      <ul>
        <li>Cada ticket tiene un código QR único y personal; no lo compartas.</li>
        <li>Un ticket solo puede validarse una vez en la entrada.</li>
        <li>
          Las condiciones del evento (precio, horario, cupo, acceso) las define el organizador.
          {{ app.name }} no es el organizador de los eventos publicados por terceros.
        </li>
        <li>Si un evento se reprograma o cancela, te avisaremos por notificación.</li>
      </ul>

      <h2>4. Si publicas eventos</h2>
      <ul>
        <li>La información del evento debe ser veraz y estar actualizada.</li>
        <li>Debes contar con los permisos que la ley o la municipalidad exijan.</li>
        <li>
          Eres responsable de la realización del evento, de atender a los asistentes y de comunicar
          cambios o cancelaciones a tiempo.
        </li>
        <li>Solo puedes subir imágenes y documentos sobre los que tengas derechos.</li>
      </ul>

      <h2>5. Reseñas y contenido</h2>
      <p>
        Las reseñas deben basarse en tu experiencia y respetar a los demás. Podemos retirar contenido
        ofensivo, falso, ilegal o que infrinja derechos de terceros.
      </p>

      <h2>6. Uso prohibido</h2>
      <ul>
        <li>Falsificar, revender sin autorización o duplicar tickets.</li>
        <li>Publicar eventos falsos o engañosos.</li>
        <li>Intentar acceder a datos de otros usuarios o afectar el funcionamiento de la app.</li>
      </ul>

      <h2>7. Responsabilidad</h2>
      <p>
        La app se ofrece "tal cual". No garantizamos que esté libre de errores ni respondemos por lo que
        ocurra en eventos organizados por terceros. Las rutas y los tiempos de tráfico son estimaciones.
      </p>

      <h2>8. Privacidad</h2>
      <p>
        El uso de tus datos se explica en la <a routerLink="/privacidad">Política de privacidad</a>.
      </p>

      <h2>9. Cambios y contacto</h2>
      <p>
        Podemos actualizar estos términos; la fecha de arriba indica la última versión. Si tienes dudas,
        escríbenos a <a [href]="'mailto:' + app.contactEmail">{{ app.contactEmail }}</a>.
      </p>

      <h2>10. Ley aplicable</h2>
      <p>Estos términos se rigen por las leyes de la República de Guatemala.</p>
    </app-legal-layout>
  `,
})
export default class Terms {
  protected readonly app = APP;
}
