import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { APP } from '../../core/config/app-links';
import { LegalLayout } from '../../shared/components/legal-layout/legal-layout';

@Component({
  selector: 'app-privacy',
  imports: [RouterLink, LegalLayout],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-legal-layout title="Política de privacidad" updatedAt="2026-10-04">
      <p>
        Esta política explica qué datos recopila la aplicación <strong>{{ app.name }}</strong> (en
        adelante, "la app"), para qué los usa, con quién los comparte y qué derechos tienes. Aplica a la
        app para Android y a este sitio web.
      </p>

      <h2>1. Quiénes somos</h2>
      <p>
        {{ app.name }} es una plataforma para descubrir, publicar y administrar eventos en Guatemala.
        Para cualquier consulta sobre privacidad escríbenos a
        <a [href]="'mailto:' + app.contactEmail">{{ app.contactEmail }}</a>.
      </p>

      <h2>2. Datos que recopilamos</h2>
      <h3>Datos de tu cuenta</h3>
      <ul>
        <li>Nombre, correo electrónico y foto de perfil, si inicias sesión con Google.</li>
        <li>Correo electrónico, si inicias sesión con un código de verificación.</li>
        <li>Los roles que tengas en la app (asistente, organizador, aprobador o staff).</li>
      </ul>
      <p>Puedes ver eventos sin crear una cuenta.</p>

      <h3>Ubicación</h3>
      <ul>
        <li>
          Con tu permiso, usamos la ubicación de tu teléfono para mostrarte eventos cercanos, calcular
          rutas y avisarte de eventos nuevos cerca de ti.
        </li>
        <li>
          Guardamos tu última ubicación aproximada y la fecha en que se actualizó. Puedes negar o retirar
          el permiso en cualquier momento desde los ajustes de Android; la app seguirá funcionando sin
          las funciones que dependen de la ubicación.
        </li>
      </ul>

      <h3>Actividad en la app</h3>
      <ul>
        <li>Reservas, tickets (con su código QR) y eventos marcados con "Voy".</li>
        <li>Reseñas y calificaciones que publiques.</li>
        <li>
          Si eres organizador: los eventos que creas, su ubicación, portada, entradas y, cuando un evento
          requiere permiso municipal, los documentos PDF que subas.
        </li>
        <li>Si eres staff: el registro de los tickets que validas.</li>
      </ul>

      <h3>Datos del dispositivo</h3>
      <ul>
        <li>
          Un identificador para enviarte notificaciones (token de Firebase Cloud Messaging) y la
          plataforma del dispositivo.
        </li>
      </ul>

      <h3>Cámara</h3>
      <p>
        La cámara se usa solo para escanear códigos QR en la entrada de un evento (staff). Las imágenes
        no se guardan ni se envían a nuestros servidores.
      </p>

      <h2>3. Para qué usamos tus datos</h2>
      <ul>
        <li>Crear y mantener tu cuenta e iniciar sesión.</li>
        <li>Mostrarte eventos, rutas y recomendaciones relevantes.</li>
        <li>Gestionar reservas, tickets y la validación en la entrada.</li>
        <li>
          Enviarte notificaciones: recordatorios, cambios o cancelaciones de eventos, recomendaciones
          semanales y eventos nuevos cerca de ti.
        </li>
        <li>Permitir a los organizadores administrar sus eventos y ver reportes de asistencia.</li>
        <li>Permitir a las municipalidades revisar los eventos que requieren permiso.</li>
        <li>Mantener la seguridad de la plataforma y corregir errores.</li>
      </ul>
      <p>No vendemos tus datos personales ni los usamos para publicidad de terceros.</p>

      <h2>4. Con quién compartimos datos</h2>
      <ul>
        <li>
          <strong>Organizadores de eventos:</strong> ven el nombre de quienes reservan o asisten a sus
          eventos y pueden exportar reportes de asistencia.
        </li>
        <li>
          <strong>Municipalidades:</strong> ven la información y los documentos de los eventos que
          revisan.
        </li>
        <li>
          <strong>Proveedores de servicio</strong> que procesan datos en nuestro nombre:
          Supabase (base de datos, autenticación y almacenamiento), Google (inicio de sesión con Google,
          Google Maps para mapas, búsqueda de direcciones y rutas) y Firebase Cloud Messaging
          (notificaciones).
        </li>
        <li>Autoridades, cuando la ley lo exija.</li>
      </ul>
      <p>Tus reseñas y tu nombre pueden ser visibles para otros usuarios en los eventos donde participes.</p>

      <h2>5. Seguridad</h2>
      <p>
        Los datos viajan cifrados (HTTPS) y el acceso a la base de datos está restringido por reglas que
        limitan lo que cada usuario puede ver o modificar según su rol.
      </p>

      <h2>6. Conservación</h2>
      <p>
        Conservamos tus datos mientras tengas una cuenta activa. Si eliminas tu cuenta, borramos tus datos
        personales en un plazo máximo de 30 días, salvo la información que debamos conservar por
        obligación legal.
      </p>

      <h2>7. Tus derechos</h2>
      <p>
        Puedes pedir acceso, corrección o eliminación de tus datos, y retirar permisos (ubicación,
        notificaciones, cámara) desde los ajustes de tu teléfono. Para eliminar tu cuenta sigue los pasos
        en <a routerLink="/eliminar-cuenta">Eliminar cuenta</a>.
      </p>

      <h2>8. Menores de edad</h2>
      <p>
        La app no está dirigida a menores de 13 años. Si crees que un menor nos dio sus datos, escríbenos
        y los eliminaremos.
      </p>

      <h2>9. Cambios a esta política</h2>
      <p>
        Si cambiamos esta política, actualizaremos la fecha de arriba y, si el cambio es importante, te
        avisaremos en la app.
      </p>
    </app-legal-layout>
  `,
})
export default class Privacy {
  protected readonly app = APP;
}
