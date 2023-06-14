import style from '../src/styles/component/overlayActionComponent.module.css';
interface IOverlayProps {
    project?: boolean
    chart?: boolean
    about?: boolean
    portfolio?: boolean
    team?: boolean
}
const OverlayActionComponent = ({
    project,
    chart,
    about,
    portfolio,
    team
}: IOverlayProps) => {
    return (<div className={`${style.overlayContainer} ${portfolio || team ? 'items-start' : 'items-center'} ${chart ? '!bg-white' : ''}`}>
        <div className={`flex gap-8 ${project ? 'flex-col' : about || portfolio || team && 'flex-row'} ${portfolio ? 'mt-80' : team ? 'mt-80' : ''}`}>
            {chart ? <div className='flex flex-col items-center gap-8'>
                <p className={style.chartOverlayText}>When you are ready feel free to use this space to provide additional details regarding your service lines you&apos;d like to share.</p>
                <button className={style.overlayBtn}>Add</button>
            </div> :
                <>
                    <button className={style.overlayBtn}>Edit</button>
                    <button className={style.overlayBtn}>Unpublish</button>
                    <button className={style.overlayBtn}>Delete</button>
                </>}
        </div>
    </div>);
}

export default OverlayActionComponent;