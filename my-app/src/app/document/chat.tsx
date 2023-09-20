"use client";

import React, { useEffect, useRef, useState } from "react";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { Message } from "ai";
import { getDate } from "@/lib/utils";
import LoadingSpinner from "@/components/ui/spinner";
// import ExamplePrompts from "./exampleprompts";

const SubProcessDisplay = ({
  subProcesses,
  isOpen,
  toggleOpen,
  messageId,
  documents,
  showSpinner = true,
}) => {
  const subQuestions = [];
  subProcesses?.forEach((subProcess, subProcessIndex) => {
    if (subProcess.metadata_map?.sub_question) {
      subQuestions.push({
        subQuestion: subProcess.metadata_map?.sub_question,
        subProcessIndex,
        subQuestionIndex: subQuestions.length,
      });
    } else if (subProcess.metadata_map?.sub_questions) {
      subProcess.metadata_map?.sub_questions.forEach(subQuestion => {
        subQuestions.push({
          subQuestion,
          subProcessIndex,
          subQuestionIndex: subQuestions.length,
        });
      });
    }
  });

  return (
    <div key={`${messageId}-sub-process`} className="mt-4 w-full rounded ">
      <div
        className="flex w-max cursor-pointer items-center rounded p-1 text-sm text-gray-90 dark:text-white hover:bg-gray-00"
        onClick={() => toggleOpen()}
      >
        View progress
        <div className="px-3 py-2">
          {isOpen ? (
            <CaretDownIcon />
          ) : (
            <CaretDownIcon className="-rotate-90" />
          )}
        </div>
      </div>
      {isOpen && (
        <>
          <div className="ml-4 pb-1 pl-4 text-[11px] font-light text-gray-60 dark:text-white">
            <div>Question Received</div>
            {subQuestions.length > 0 && (
              <div
                key={`${messageId}-sub-process`}
                className="text-gray-60 dark:text-white"
              >
                <div>
                  {subQuestions.map(
                    ({ subQuestion, subQuestionIndex, subProcessIndex }) => {
                      const hasCitations = !!subQuestion.citations;
                      return (
                        <div
                          key={`${messageId}-${subProcessIndex}-${subQuestionIndex}`}
                        >
                          Generated Sub Query #{subQuestionIndex + 1}{" "}
                          <div className="flex w-11/12 flex-col rounded">
                            <div className="rounded-t bg-gray-00 p-2 font-bold text-gray-90 dark:text-white">
                              {subQuestion.question}
                            </div>
                            <div className="overflow-scroll p-2 text-[11px] font-light">
                              {subQuestion.answer}
                            </div>

                            {hasCitations && (
                              <div className=" mr-2 flex w-full overflow-x-scroll pl-2 ">
                                {subQuestion.citations?.map(
                                  (citation, citationIndex) => {
                                    // get snippet and dispaly date from documentId
                                    const citationDocument = documents.find(
                                      doc => doc.id === citation.document_id
                                    );
                                    if (!citationDocument) {
                                      return;
                                    }
                                    const yearDisplay = citationDocument.quarter
                                      ? `${citationDocument.year} Q${citationDocument.quarter}`
                                      : `${citationDocument.year}`;
                                    return <></>;
                                  }
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            )}
          </div>
          {showSpinner && <LoadingSpinner />}
          <div className="pb-2"></div>
        </>
      )}
    </div>
  );
};

interface UserMessageProps {
  message: Message;
  showLoading: boolean;
}

const UserMessage = ({ message, showLoading }: UserMessageProps) => {
  return (
    <>
      <div className="flex pb-4">
        <div className="mt-4 w-1/5 flex-grow text-right text-gray-60 dark:text-white">
          <div className="flex items-center justify-center">
            {getDate(message.createdAt)}
          </div>
        </div>
        <div className="mt-4 w-4/5 pr-3 font-bold text-gray-90 dark:text-white">
          {message.content}
        </div>
      </div>
      {showLoading && (
        <div className="flex pb-4">
          <div className="w-1/5"></div>
          <div className="w-4/5">
            <SubProcessDisplay
              key={`${message.id}-loading-sub-process`}
              messageId={message.id}
              subProcesses={[]}
              isOpen={true}
              toggleOpen={() => {}}
              showSpinner={true}
              documents={[]}
            />
          </div>
        </div>
      )}
    </>
  );
};

const ErrorMessageDisplay = () => {
  return (
    <div className="mt-2 flex w-80 items-center rounded bg-red-100 bg-opacity-20 p-1">
      <div className="ml-2">you fucked up</div>
      <div className="ml-4 text-red-400">
        Error: unable to load chat response
      </div>
    </div>
  );
};

const AssistantDisplay = ({ message, documents }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const isMessageSuccessful = message != null;
  const isMessageError = message == null;

  useEffect(() => {
    if (isMessageSuccessful) {
      setIsExpanded(false);
    }
  }, [isMessageSuccessful]);
  return (
    <div className="pb-4">
      <div className="flex ">
        <div className="w-1/5"></div>
        <div className="w-4/5">
          {!isMessageError && (
            <div className="flex flex-col">
              <SubProcessDisplay
                key={`${message.id}-sub-process`}
                subProcesses={message.sub_processes || []}
                isOpen={isExpanded}
                toggleOpen={() => setIsExpanded(prev => !prev)}
                showSpinner={!isMessageSuccessful}
                messageId={message.id}
                documents={documents}
              />
            </div>
          )}
          {isMessageError && <ErrorMessageDisplay />}
        </div>
      </div>

      {!isMessageError && (
        <>
          <div className="flex items-center justify-center">
            <div className="my-3 w-11/12"></div>
          </div>
          <div className="flex ">
            <div className="w-1/5"></div>
            <div className="w-4/5">
              <p className="relative mb-2 mt-2 pr-3 whitespace-pre-wrap font-bold text-gray-90 dark:text-white">
                {message.content}
              </p>
              <p className="flex items-center justify-start p-1 text-xs text-gray-60 dark:text-white">
                Disclaimer
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

interface RenderConversationsProps {
  messages: Message[];
  documents?: any[];
}

export const RenderConversations = ({
  messages,
  documents,
}: RenderConversationsProps) => {
  const lastElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastElementRef.current) {
      lastElementRef.current!.scrollIntoView();
    }
  }, [messages]);

  return (
    <div className="prose flex h-fit flex-col divide-y text-sm div">
      {messages.map((message, index) => {
        return (
          <div key={`message-${message.id}`}>
            {message.role == "assistant" ? (
              <AssistantDisplay
                message={message}
                key={`${message.id}-answer-${index}`}
                documents={documents}
              />
            ) : (
              <UserMessage
                message={message}
                key={`${message.id}-question-${index}-user`}
                showLoading={index === messages.length - 1}
              />
            )}
          </div>
        );
      })}
      <div ref={lastElementRef} />
    </div>
  );
};
