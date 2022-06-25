import classNames from 'classnames';
import { format, isPast } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { CheckCircle, Lock } from 'phosphor-react';
import { Link, useParams } from 'react-router-dom';

interface Lesson {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

export function Lesson(props: Lesson) {
  const isLessonAvailable = isPast(props.availableAt);
  const formattedAvailabilityDate = format(
    props.availableAt,
    'EEEE \'•\' d \'de\' MMMM \'•\' k\'h\'mm',
    { locale: ptBR },
  );

  const { slug: routeSlug } = useParams<{ slug: string }>();
  const isActive = routeSlug === props.slug;

  return (
    <Link to={ `/event/lesson/${ props.slug }` } className="group">
      <span className="text-gray-300">
        { formattedAvailabilityDate }
      </span>

      <div className={ classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500', {
        'bg-green-500': isActive,
      }) }>
        <header className="flex items-center justify-between">
          { isLessonAvailable ? (
            <span className={classNames('text-sm font-medium flex items-center gap-1', {
              'text-white': isActive,
              'text-blue-500': !isActive,
            })}>
            <CheckCircle size={ 20 }/>
            Conteúdo liberado
          </span>
          ) : (
          <span className="text-sm text-orange-500 font-medium flex items-center gap-1">
            <Lock size={ 20 }/>
            Em breve...
          </span>
            ) }
          <span className={ classNames('text-xs rounded px-2 py-0.5 text-white border font-bold', {
            'border-white': isActive,
            'border-green-300': !isActive,
          }) }>
            { props.type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA' }
          </span>
        </header>
        <strong className={ classNames('mt-5 block', {
          'text-white': isActive,
          'text-gray-200': !isActive,
        }) }>
          { props.title }
        </strong>
      </div>
    </Link>
  );
}
