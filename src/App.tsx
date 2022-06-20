import './styles.css';
import Dialog from './Dialog';

export default function App() {
  return (
    <main className="App">
      <h1>Dialog Exercise</h1>
      <h2>Build a reusable, accesible dialog component</h2>
      <p>
        For any questions:
        <br />
        <strong>Jonathan:</strong> 050-30-10-160; jonathan.pollak@haaretz.co.il
      </p>
      <hr />

      <section>
        <p>
          A dialog is a popup-like element, that opens as an interstatial
          overlay above the UI, usually in response to user interaction. A modal
          is dialog that blocks the entire application UI, and prevents
          interaction with any content outside the modal itself.
        </p>
        <p>
          Regular dialogs will mostly use <code>position: absolute;</code> ,
          while modals will often be assigned <code>position: fixed;</code>.
        </p>
        <p>
          Using React hooks or the{' '}
          <a href="https://reactjs.org/docs/render-props.html" rel="nofollow">
            render-prop pattern
          </a>{' '}
          and whichever technical stack you'd like, build a{' '}
          <em>reusable React component</em> that handles the above concerns,{' '}
          <strong>
            while leaving design choices completely in the hands of the
            component's consumer.
          </strong>{' '}
          The component should only concern itself with providing acceibilty and
          behaviour primitives for the consumer to hook into, and have
          absolutely no opinion on how the UI will look like.
        </p>
        <p>
          <strong>
            Please make sure to avoid direct interaction with the DOM. Hint:
            React's{' '}
            <a href="https://reactjs.org/docs/portals.html" rel="nofollow">
              Portal
            </a>{' '}
            feature can come in handy when reparenting the dialog.
          </strong>
        </p>
        <p>
          To create such an element, several concerns need to be addressed,
          including accessibility.
        </p>
        <ol>
          <li>
            <p>
              The dialog or its wrapper should be a sibling of the content it
              covers in the DOM.
            </p>
          </li>
          <li>
            <p>
              The content beneath the dialog should be visually obscured by an
              overlay even if the dialog itself covers only part of the area.
            </p>
          </li>
          <li>
            <p>
              The dialog should use a{' '}
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog"
                rel="nofollow"
              >
                <code>&lt;dialog&gt;</code>
              </a>
              element, or, alternatively, hav a <code>role</code> of{' '}
              <code>dialog</code>.
            </p>
          </li>
          <li>
            <p>
              The content, inside the <code>dialog</code> element should be
              wrapped by a <code>div</code> with a<code>role</code> of{' '}
              <code>document</code>, to ensure predictable key bindings.
            </p>
            <div>
              <pre>
                {`<section>
  <div id="sectionContent">
   <!-- content -->
  </div>
  <dialog>
     <div role="document">
       <!-- dialog content -->
     </div>
   </dialog>
</section>`}
              </pre>
            </div>
          </li>
          <li>
            <p>
              On opening the dialog, the DOM element wrapping the content (the{' '}
              <code>div</code> with the <code>sectionConent</code> id in the
              example above) should be assigned an
              <code>aria-hidden="true"</code> attribute, to prevent assisitive
              tech, namely screen readers, from interacting with it.
            </p>
          </li>
          <li>
            <p>
              On opening the dialog, focus should be set to the first
              interactive element
            </p>
          </li>
          <li>
            <p>
              The tab-cycled focus should be trapped inside <code>dialog</code>
            </p>
          </li>
          <li>
            <p>
              Any click outside the dialog (on the overlay) should close the
              dialog
            </p>
          </li>
          <li>
            <p>
              Hitting the <code>Esc</code> key should close the dialog.
            </p>
          </li>
          <li>
            <p>
              On closing the dialog, the <code>aria-hidden</code> attribute
              should be removed from the DOM element wrapping the content.
            </p>
          </li>
          <li>
            <p>
              On closing the dialog, focus should be restored to the element
              which was focused before the dialog was opened.
            </p>
          </li>
        </ol>
      </section>
    </main>
  );
}
